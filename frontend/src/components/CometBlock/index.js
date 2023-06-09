import './CometBlock.css';
import Loading from '../Loading/index';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CometBlock = ({ comet, author }) => {
    const getAuthorPicture = () => {
        return (
            <img src={logo} alt='Default Author Picture' className='feed-block-item author-picture' />
        )
    }

    const commetContent = () => {
        return(
            <div className='comet-block-item comet-feed-content'>{comet.content}</div>
        )
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
                    </div>
                    {commetContent()}
                </div>
            </div> 
        </div>
    );
}

export default CometBlock;