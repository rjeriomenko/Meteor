import './FeedBlock.css';
import Loading from '../Loading/index';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
        const tempElement = document.createElement('div');
        tempElement.innerHTML = tale.content;
        const introDiv = tempElement.querySelector('.input-div:not(.publish-title-text)');
        const intro = introDiv.textContent.slice(0, 150) + '...';

        tempElement.remove()

        return(
            <div className='feed-block-item feed-block-intro'>{intro}</div>
        )
    }

    const getThumbnail = () => {
        return (
            <Link to={`/tales/${tale.id}`} className='thumbnail'>
                <img src={logo} alt='Default Thumbnail' className='thumbnail' />
            </Link>
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
                        <Link to={`/tales/${tale.id}`} className='feed-block-item publish-date'>.PUBDATE</Link>
                    </div>
                    <Link to={`/tales/${tale.id}`}>
                            <div className='feed-block-item feed-block-title'>
                                {tale.title}
                            </div>
                            {getIntro()}
                    </Link>
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