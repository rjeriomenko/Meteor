import './FeedBlock.css';
import Loading from '../Loading/index';
import logo from '../../logo.png';
import { getTale, fetchTale } from '../../store/talesReducer';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const FeedBlock = ({ tale, user }) => {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));
    const [loading, setLoading] = useState(false);
    const [scrollToReload, setscrollToReload] = useState(300);

    const getAuthorPicture = () => {
        return (
            <img src={logo} alt='Default Author Picture' className='feed-block-item author-picture' />
        )
    }

    const getIntro = () => {
        const intro = tale.content.slice(0, 150) + '...';

        return(
            <div className='feed-block-item feed-block-intro'>{intro}</div>
        )
    }

    const getThumbnail = () => {
        return (
            <img src={logo} alt='Default Thumbnail' className='thumbnail' />
        )
    }

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
            <div className='feed-block-content'>
                <div className='feed-block-content-text'>
                    <div className='feed-block-author'>
                        {getAuthorPicture()}
                        <div className='feed-block-item author-fullname'>{user.fullName}</div>
                        <div className='feed-block-item publish-date'>.PUBDATE</div>
                    </div>
                        <div className='feed-block-item feed-block-title'>
                            {tale.title}
                        </div>
                        {getIntro()}
                        <div className='feed-block-item feed-block-constellation'>
                            TAGDRAMA
                        </div>
                </div>
                    {getThumbnail()}
            </div>
        </div>
    );
}

export default FeedBlock;