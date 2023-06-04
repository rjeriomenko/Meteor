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

    const getEventConstants = () => {
        const selection = window.getSelection();
        const selectedNode = selection.anchorNode;
        const parentDivElement = getDivParent(selectedNode);
        const parentDivClassList = parentDivElement.classList;

        return {
            selection: selection,
            selectedNode: selectedNode,
            parentDivElement: parentDivElement,
            parentDivClassList: parentDivClassList
        };
    }

    const resetRange = node => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(node, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    const handleDeleteLastLine = (event) => {
        const content = document.body.querySelector('.publish-content');
        const { selectedNode, parentDivClassList } =
            getEventConstants();

        if (selectedNode.textContent === '' &&
            event.key === 'Backspace' &&
            parentDivClassList.contains('input-div') &&
            content.children.length <= 1
        ) {
            event.preventDefault();
            const newDiv = document.createElement('div');
            newDiv.classList.add('input-div');
            newDiv.classList.add('focused');
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

    const addEventListeners = () => {
        const content = document.body.querySelector('.publish-content');

        document.addEventListener('selectionchange', e => {
            handleFocusChange();
        });

        content.addEventListener('keydown', e => {
            deleteDefaultText(e.key);
            handleFocusChange();
            handleDeleteLastLine(e);
        });

        content.addEventListener('keyup', e => {
            handleFocusChange();
        });
    }

    useEffect(() => {
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
