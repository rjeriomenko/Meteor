import './CometBlock.css';
import Loading from '../Loading/index';
import invertedLogo from '../../inverted-logo.png';
import { deleteComet, fetchComets, updateComet } from '../../store/cometsReducer';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CometBlock = ({ comet, author, currentUser, taleId }) => {
    const dispatch = useDispatch();

    const [editContent, setEditContent] = useState(comet.content);
    const [showEditForm, setShowEditForm] = useState(false);

    const getAuthorPicture = () => {
        return (
            <img src={invertedLogo} alt='Default Author Picture' className='feed-block-item author-picture' />
        )
    }

    const cometContent = () => {
        if(!showEditForm) {
            return (
                <div className='comet-block-item comet-feed-content' id={`comet-content-${comet.id}`}>{comet.content}</div>
            )
        } else {
            return (
                <form className='comet-form' onSubmit={handleCometEditSubmit}>
                    <textarea onChange={onContentEditChange} value={editContent} className='comet-form-text-input' placeholder='...'>
                    </textarea>

                    <input type='submit' value='Update' className='comet-form-submit' id={`comet-edit-update-${comet.id}`} />
                </form>
            )
        }
    }

    const handleDelete = e => {
        e.target.classList.add('comet-submitting');

        dispatch(deleteComet(comet.id))
            .then(() => {
                dispatch(fetchComets(taleId));
            })
    }

    const onContentEditChange = e => {
        setEditContent(e.target.value);
    }

    const handleCometEditSubmit = e => {
        e.preventDefault();

        const updateButton = document.body.querySelector(`#comet-edit-update-${comet.id}`)
        const editButton = document.body.querySelector(`#comet-edit-${comet.id}`)
        const ensureNotAllSpacesRegex = /^\s*[^ ]\S/;
        if (editContent !== comet.content && ensureNotAllSpacesRegex.test(editContent) ) {
            const updatedComet = {
                id: comet.id,
                content: editContent.trim()
            }
            updateButton.classList.add('comet-submitting');

            dispatch(updateComet(updatedComet))
                .then(() => {
                    updateButton.classList.remove('comet-submitting');
                    editButton.innerText = 'Edit';
                    setShowEditForm(false);
                });
        }
    }

    const handleEdit = e => {
        if (e.target.innerText === 'Edit') {
            e.target.innerText = 'Cancel';
        } else {
            e.target.innerText = 'Edit';
        }

        setEditContent(comet.content);
        setShowEditForm(!showEditForm);
    }

    const renderCometCrud = () => {
        if (currentUser?.id === comet.userId) {
            return (
                <>
                    <div className='comet-feed-block-button' id={`comet-edit-${comet.id}`} onClick={handleEdit}>
                        Edit
                    </div>
                    <div className='comet-feed-block-button' id={`comet-delete-${comet.id}`} onClick={handleDelete}>
                        Delete
                    </div>
                </>
            )
        }
    }

   return (
        <div className='comet-feed-block'>
            <div className='comet-feed-block-content'>
                <div className='feed-block-content-text'>
                    <div className='feed-block-author'>
                        {getAuthorPicture()}
                        <div className='feed-block-item author-fullname'>
                            {author.fullName}
                        </div>
                        {renderCometCrud()}
                    </div>
                    {cometContent()}
                </div>
            </div> 
        </div>
    );
}

export default CometBlock;