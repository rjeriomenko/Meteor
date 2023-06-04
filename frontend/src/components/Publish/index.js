import './Publish.css';
import SiteNavBar from '../SiteNavBar/index';
import { useEffect } from 'react';

const Publish = props => {

    const getDivParent = node => {
        while (node.nodeName !== 'DIV') {
            node = node.parentElement;
        }

        return node;
    }

    const newInputDiv = () => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('input-div');
        newDiv.classList.add('focused');

        return newDiv;
    }

    const getEventConstants = () => {
        const content = document.body.querySelector('.publish-content');
        const selection = window.getSelection();
        const selectedNode = selection.anchorNode;
        const selectedOffset = selection.anchorOffset;
        const parentDivElement = getDivParent(selectedNode);
        const parentDivClassList = parentDivElement.classList;

        return {
            content: content,
            selection: selection,
            selectedNode: selectedNode,
            selectedOffset: selectedOffset,
            parentDivElement: parentDivElement,
            parentDivClassList: parentDivClassList
        };
    }

    const newRange = () => {
        let firstInputDiv = document.body.querySelector('[class="input-div"]') ||
        document.body.querySelector('[class="input-div unmodified"]') ||
        document.body.querySelector('[class="input-div unmodified focused"]') ||
        document.body.querySelector('.input-div');
        const selection = window.getSelection();
        const range = document.createRange();

        range.setStart(firstInputDiv, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    const resetRange = node => {
        const { content, selection } =
            getEventConstants();

        if (selection.anchorOffset !== 0 || content.children.length <= 1) {
            const range = document.createRange();
            range.setStart(node, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    const handleDeleteLastLine = (event) => {
        const { content, selectedNode, parentDivClassList } =
            getEventConstants();

        if (selectedNode.textContent === '' &&
            event.key === 'Backspace' &&
            parentDivClassList.contains('input-div') &&
            content.children.length <= 1
        ) {
            event.preventDefault();
            const newDiv = newInputDiv();
            content.appendChild(newDiv);
            content.removeChild(content.firstChild);
    
            resetRange(newDiv)
        };
    }

    const deleteDefaultText = (key) => {
        const { selectedNode, parentDivClassList } =
            getEventConstants();

        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key) &&
            parentDivClassList.contains('unmodified')) {
            {
                selectedNode.textContent = '';
                parentDivClassList.remove('unmodified');
            };
        };
    }

    const handleFocusChange = () => {
        const { parentDivElement, parentDivClassList } =
            getEventConstants();
        let previousFocused = document.body.querySelector('.focused');
    
        if (parentDivElement.classList.contains('input-div')) {
            while (previousFocused) {
                previousFocused.classList.remove('focused');
                previousFocused = document.body.querySelector('.focused')
            }
            parentDivClassList.add('focused');
        }
    
        if (parentDivClassList.contains('unmodified')) {
            resetRange(parentDivElement);
        };
    }

    const handleTooltipSelection = () => {
        // const { parentDivElement, parentDivClassList } =
        //     getEventConstants();

        const selectedText = window.getSelection().toString().trim();
        console.log(selectedText);
        
    };

    const handlePreventUnderline = event => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'u') {
            event.preventDefault();
        }
    };

    const handlePaste = event => {
        const { selectedOffset, selectedNode, content } =
            getEventConstants();

        const selectedTextContent = selectedNode.textContent || '';
        const pasteData = event.clipboardData;
        const pasteText = pasteData.getData('text/plain');
        const splitArray = pasteText.split('\n');
        const filteredArray = splitArray.filter(line => line.length > 0);

        if (filteredArray.length === 1) {
            selectedNode.textContent = selectedTextContent.slice(0, selectedOffset) +
                filteredArray.shift() + selectedTextContent.slice(selectedOffset);
        } else {
            selectedNode.textContent = selectedTextContent.slice(0, selectedOffset) + filteredArray.shift();

            while (filteredArray.length > 1) {
                const newDiv = newInputDiv();
                newDiv.textContent = filteredArray.shift();
                console.log(newDiv)
                content.appendChild(newDiv);
            }

            const newDiv = newInputDiv();
            newDiv.textContent = filteredArray.shift() + selectedTextContent.slice(selectedOffset);
            content.appendChild(newDiv);
        }
    }

    const addEventListeners = () => {
        const { content } = getEventConstants();
        
        document.addEventListener('selectionchange', e => {
            handleFocusChange();
            handleTooltipSelection();
        });

        content.addEventListener('keydown', e => {
            deleteDefaultText(e.key);
            handleFocusChange();
            handleDeleteLastLine(e);
            handlePreventUnderline(e);

        });

        content.addEventListener('keyup', e => {
            handleFocusChange();

        });

        document.addEventListener('paste', e => {
            e.preventDefault();
            e.stopPropagation();

            handlePaste(e);
        })

    }

    useEffect(() => {
        newRange();
        addEventListeners();
    }, []);

    return (
        <>
            <SiteNavBar page='publish' />

            <div className='publish'>
                <div contentEditable={true} className='publish-content'>
                    <div className= 'input-div publish-title-text unmodified'>Title</div>
                    <div className= 'input-div unmodified'>Tell your story...</div>
                </div>
            </div>
        </>
    );
}

export default Publish;
