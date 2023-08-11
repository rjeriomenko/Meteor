import './CometBlock.css';
import Loading from '../Loading/index';
import invertedLogo from '../../inverted-logo.png';
import { deleteComet, fetchComets } from '../../store/cometsReducer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CometBlock = ({ comet, author, currentUser, taleId }) => {
    const dispatch = useDispatch();

    const getAuthorPicture = () => {
        return (
            <img src={invertedLogo} alt='Default Author Picture' className='feed-block-item author-picture' />
        )
    }

    const commetContent = () => {
        return(
            <div className='comet-block-item comet-feed-content'>{comet.content}</div>
        )
    }

    const handleDelete = e => {
        e.target.classList.add('comet-deleting');
        
        dispatch(deleteComet(comet.id))
            .then(() => {
                dispatch(fetchComets(taleId));
            })
    }

    const renderCometCrud = () => {
        if (currentUser?.id === comet.userId) {
            return (
                <>
                    <div className='comet-feed-block-button' id={`comet-edit-${comet.id}`}>
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
                    {commetContent()}
                </div>
            </div> 
        </div>
    );
}

export default CometBlock;