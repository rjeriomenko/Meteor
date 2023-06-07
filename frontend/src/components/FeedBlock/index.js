import './FeedBlock.css';
import Loading from '../Loading/index';
import { getTale, fetchTale } from '../../store/talesReducer';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const FeedBlock = ({ tale, user }) => {
    console.log(user)
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));
    const [loading, setLoading] = useState(false);
    const [scrollToReload, setscrollToReload] = useState(300);

    // const renderContent = contentString => {
    //     const content = document.body.querySelector('.show-content')
    //     content.innerHTML = contentString;
    // }

    //Handles Page Loading
    // useEffect(() => {
    //     dispatch(fetchTale(taleId))
    //     .then(() => {
    //         setLoading(false);
    //     });
    // }, [])

    //Handles preparing Tale text and event listeners
    useEffect(() => {
        if (!loading) {
            // renderContent(contentString);
        }
    }, [loading])

    if (loading) {
        return (
        <Loading />
    )} else return (
        <div className='feed-block'>
            <div className='feed-block-author'>
                {user.fullName}
            </div>
            <div className='feed-block-title'>
                {tale.title}
            </div>
        </div>
    );
}

export default FeedBlock;