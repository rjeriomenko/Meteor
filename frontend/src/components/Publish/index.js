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

    const handleDefaultTextAndFocus = () => {
        const content = document.body.querySelector('.publish-content');
        
        content.addEventListener('keydown', e => {
            const selection = window.getSelection();
            const selectedNode = selection.anchorNode;
            const parentElement = getDivParent(selectedNode);
            const selectedClassList = parentElement.classList;
            const previousFocused = document.body.querySelector('.focused');

            if (previousFocused) {
                previousFocused.classList.remove('focused');
            }

            parentElement.classList.add('focused');

            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) &&
                selectedClassList.contains('unmodified')) {
                     {
                        selectedNode.textContent = '';
                        selectedClassList.remove('unmodified');
                    };
                }

            // if (selectedNode.textContent === '' &&  //ATTEMPT AT PREVENTING USER DELETION OF LAST LINE
            //     e.key === 'Backspace' &&
            //     selectedNode.classList.contains('input-div') &&
            //     parentElement.children.length > 1
            //     ) {
            //         e.preventDefault(); //THIS DOESNT DO ANYTHING
            //         selectedNode.remove();
            // };
        });

        content.addEventListener('keyup', e => {
            const selection = window.getSelection();
            const selectedNode = selection.anchorNode;
            const parentElement = getDivParent(selectedNode)
            const previousFocused = document.body.querySelector('.focused');

            if (previousFocused) {
                previousFocused.classList.remove('focused');
            }

            parentElement.classList.add('focused');
        });

        content.addEventListener('click', e => {
            const selection = window.getSelection()
            const selectedNode = selection.anchorNode;
            const parentElement = getDivParent(selectedNode)
            const selectedClassList = parentElement.classList;
            const previousFocused = document.body.querySelector('.focused');
            
            if (previousFocused) {
                previousFocused.classList.remove('focused');
            }

            selectedClassList.add('focused');
        });

        // content.addEventListener('click', e => {  //ATTEMPT AT MAKING CURSOR START AT BEGINNING OF DEFAULT TEXT LINES
        //     const selection = window.getSelection()
        //     const selectedNode = selection.anchorNode;
        //     const parentElement = selectedNode.parentElement;
        //     const selectedClassList = parentElement.classList;

        //     if (selectedClassList.contains('unmodified')) {
        //         const range = document.createRange();
        //         range.setStart(parentElement, 0);
        //         range.collapse(true);
        //         selection.removeAllRanges();
        //         selection.addRange(range);
        //     };
        // });
    };

    useEffect(() => {
        handleDefaultTextAndFocus();
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
