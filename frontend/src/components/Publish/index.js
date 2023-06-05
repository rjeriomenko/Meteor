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
        let selectedNode = null;
        let selectedAnchorOffset = null;
        let selectedFocusOffset = null;
        let parentDivElement = null;
        let parentDivClassList = null;
        
        if (selection.type!== 'None') {
            selectedNode = selection.anchorNode;
            selectedAnchorOffset = selection.anchorOffset;
            selectedFocusOffset = selection.focusOffset;
            parentDivElement = getDivParent(selectedNode);
            parentDivClassList = parentDivElement.classList;
        }

        return {
            content: content,
            selection: selection,
            selectedNode: selectedNode,
            selectedAnchorOffset: selectedAnchorOffset,
            selectedFocusOffset: selectedFocusOffset,
            parentDivElement: parentDivElement,
            parentDivClassList: parentDivClassList
        };
    }

    const getPasteConstants = event => {
        const { selectedNode } = getEventConstants();

        const selectedText = window.getSelection().toString().trim()
        const selectedNodeTextContent = selectedNode.textContent || '';
        const pasteData = event.clipboardData;
        const pasteText = pasteData.getData('text/plain');
        const splitArray = pasteText.split('\n');
        const filteredArray = splitArray.filter(line => line.length);

        return {
            selectedText: selectedText,
            selectedNodeTextContent: selectedNodeTextContent,
            pasteData: pasteData,
            pasteText: pasteText,
            splitArray: splitArray,
            filteredArray: filteredArray
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
    
            resetRange(newDiv);
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
        while (previousFocused) {
            previousFocused.classList.remove('focused');
            previousFocused = document.body.querySelector('.focused');
        }
    
        if (parentDivElement) {
            if (parentDivElement.classList.contains('input-div')) {
                parentDivClassList.add('focused');
            }
            if (parentDivClassList.contains('unmodified')) {
                resetRange(parentDivElement);
            };
        };
    };

    const handleTooltipSelection = () => {
        // const { parentDivElement, parentDivClassList } = ///THIS PART REALLY MAY NOT BE NECESSARY
        //     getEventConstants();

        // const selectedText = window.getSelection().toString().trim();
        // console.log(selectedText);
        
    };

    const handlePreventUnderline = event => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'u') {
            event.preventDefault();
        };
    };

    const handleSinglePaste = event => {
        const { selectedNode, selectedAnchorOffset, parentDivElement} = getEventConstants();

        const { selectedNodeTextContent, filteredArray } =
            getPasteConstants(event);

        if (filteredArray.length === 1) {
            selectedNode.textContent = selectedNodeTextContent.slice(0, selectedAnchorOffset) +
                filteredArray.shift() + selectedNodeTextContent.slice(selectedAnchorOffset);
        } else {
            selectedNode.textContent = selectedNodeTextContent.slice(0, selectedAnchorOffset) + filteredArray.shift();
            let previousNode = parentDivElement;

            while (filteredArray.length > 1) {
                const newDiv = newInputDiv();
                newDiv.textContent = filteredArray.shift();
                previousNode.insertAdjacentElement('afterend', newDiv);
                previousNode = newDiv;
            }

            const newDiv = newInputDiv();
            newDiv.textContent = filteredArray.shift() + selectedNodeTextContent.slice(selectedAnchorOffset);
            previousNode.insertAdjacentElement('afterend', newDiv);
        };
    };

    const removeNodesBetween = (node1, node2) => {
        let startNode;
        let endNode;
        if (node1.compareDocumentPosition(node2) === Node.DOCUMENT_POSITION_PRECEDING) {
            startNode = node2;
            endNode = node1;
        } else {
            startNode = node1;
            endNode = node2;
        }

        const { content } = getEventConstants();
        const walker = document.createTreeWalker(
            content, 
            NodeFilter.SHOW_ALL,
            null,
            false
        );

        const nodesToDelete = [];
        walker.currentNode = startNode.nextSibling;

        while (walker.currentNode !== endNode) {
            nodesToDelete.push(walker.currentNode);
            walker.nextNode();
        };

        nodesToDelete.forEach(node => node.remove());
    };

    const handleSelectionPaste = event => {
        const { selection, selectedNode, selectedAnchorOffset, selectedFocusOffset, parentDivElement } = getEventConstants();

        const { selectedNodeTextContent, filteredArray } =
            getPasteConstants(event);

        const focusNode = selection.focusNode;

        let startNode;
        let endNode;
        let startOffset;
        let endOffset;

        if (selectedNode.compareDocumentPosition(focusNode) === Node.DOCUMENT_POSITION_PRECEDING) {
            startNode = focusNode;
            startOffset = selectedFocusOffset;
            endNode = selectedNode;
            endOffset = selectedAnchorOffset;
        } else {
            startNode = selectedNode;
            startOffset = selectedAnchorOffset;
            endNode = focusNode;
            endOffset = selectedFocusOffset;
        }

        const startNodeTextContent = startNode.textContent || '';
        const endNodeTextContent = endNode.textContent || '';


        if (startNode === endNode) {
            startOffset = selectedAnchorOffset < selectedFocusOffset ? selectedAnchorOffset : selectedFocusOffset;
            endOffset = selectedAnchorOffset > selectedFocusOffset ? selectedAnchorOffset : selectedFocusOffset;

            if (filteredArray.length === 1) {
                selectedNode.textContent = selectedNodeTextContent.slice(0, startOffset) +
                    filteredArray.shift() + selectedNodeTextContent.slice(endOffset);
            } else {
                selectedNode.textContent = selectedNodeTextContent.slice(0, startOffset) + filteredArray.shift();
                let previousNode = parentDivElement;
    
                while (filteredArray.length > 1) {
                    const newDiv = newInputDiv();
                    newDiv.textContent = filteredArray.shift();
                    previousNode.insertAdjacentElement('afterend', newDiv);
                    previousNode = newDiv;
                };
    
                const newDiv = newInputDiv();
                newDiv.textContent = filteredArray.shift() + selectedNodeTextContent.slice(endOffset);
                previousNode.insertAdjacentElement('afterend', newDiv);
            };
        } else {
            if (filteredArray.length === 1) {
                startNode.textContent = startNodeTextContent.slice(0, startOffset) +
                    filteredArray.shift() + endNodeTextContent.slice(endOffset);
                removeNodesBetween(getDivParent(startNode), getDivParent(endNode));
                getDivParent(endNode).remove();
            } else { //THIS IS WHERE I NEED TO THIMK AND ALSO WHERE I AM.
                startNode.textContent = startNodeTextContent.slice(0, startOffset) + filteredArray.shift();
                let previousNode = parentDivElement;

                while (filteredArray.length > 1) {
                    const newDiv = newInputDiv();
                    newDiv.textContent = filteredArray.shift();
                    previousNode.insertAdjacentElement('afterend', newDiv);
                    previousNode = newDiv;
                }

                const newDiv = newInputDiv();
                newDiv.textContent = filteredArray.shift() + endNodeTextContent.slice(endOffset);
                previousNode.insertAdjacentElement('afterend', newDiv);
                removeNodesBetween(newDiv, getDivParent(endNode));
                getDivParent(endNode).remove();
            };
        }

    }

    const handlePaste = event => {
        const { selectedText } = getPasteConstants(event);

        if (!selectedText.length) {
            handleSinglePaste(event);
        } else {
            handleSelectionPaste(event);
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
