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

    const handleDefaultTextAndFocusAndDeleteLastLine = () => {
        const content = document.body.querySelector('.publish-content');

        document.addEventListener('selectionchange', e => {
            const selection = window.getSelection();
            const selectedNode = selection.anchorNode;
            const parentDivElement = getDivParent(selectedNode);
            const parentDivClassList = parentDivElement.classList;
            const previousFocused = document.body.querySelector('.focused');

            if (parentDivElement.classList.contains('input-div')) {
                if (previousFocused) {
                    previousFocused.classList.remove('focused');
                }

                parentDivClassList.add('focused');
            }

            if (parentDivClassList.contains('unmodified')) {
                const range = document.createRange();
                range.setStart(parentDivElement, 0);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            };
        });


        content.addEventListener('keydown', e => {
            const selection = window.getSelection();
            const selectedNode = selection.anchorNode;
            const parentDivElement = getDivParent(selectedNode);
            const parentDivClassList = parentDivElement.classList;

            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) &&
                parentDivClassList.contains('unmodified')) {
                {
                    selectedNode.textContent = '';
                    parentDivClassList.remove('unmodified');
                };
            };

            if (selectedNode.textContent === '' &&
                e.key === 'Backspace' &&
                parentDivClassList.contains('input-div') &&
                content.children.length <= 1
            ) {
                e.preventDefault();
                const newDiv = document.createElement('div');
                newDiv.classList.add('input-div');
                newDiv.classList.add('focused');
                content.appendChild(newDiv);
                content.removeChild(content.firstChild);

                const range = document.createRange();
                range.setStart(newDiv, 0);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            };
        });
    }

    useEffect(() => {
        handleDefaultTextAndFocusAndDeleteLastLine();
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
