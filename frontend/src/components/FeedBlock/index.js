import './FeedBlock.css';
import Loading from '../Loading/index';
import logo from '../../logo.png';
import invertedLogo from '../../inverted-logo.png';
import { fetchPublishedTales, fetchFollowTales } from '../../store/talesReducer';
import { createFollow, deleteFollow, getFollows } from '../../store/followsReducer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const FeedBlock = ({ tale, author, typeOfFeed }) => {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));
    const [loading, setLoading] = useState(false);
    const [scrollToReload, setscrollToReload] = useState(300);

    const follows = useSelector(getFollows)
    let followId;
    if (typeOfFeed && currentUser && author) {
        const followTuple = Object.entries(follows)
            .filter(([followId, follow]) => follow.followerId === currentUser.id && follow.followeeId === author.id)[0];
        if (followTuple) followId = followTuple[0];
    }

    const getAuthorPicture = () => {
        return (
            <img src={invertedLogo} alt='Default Author Picture' className='feed-block-item author-picture' />
        )
    }

    const getIntro = () => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = tale.content;
        const introDiv = tempElement.querySelector('.input-div:not(.publish-title-text)');
        const intro = introDiv.textContent.slice(0, 200) + '...';

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

    const getTimeDifference = () => {
        const publishTime = new Date(tale.publishTime);
        const currentTime = new Date();

        const timeDifference = currentTime.getTime() - publishTime.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (hoursDifference >= 24) {
            return `${daysDifference} days ago`;
        } else if (hoursDifference > 1) {
            return `${hoursDifference} hours ago`;
        } else {
            return `Less than an hour ago`
        }
    }

    const handleChartClick = () => {
        if (!typeOfFeed) {
            dispatch(createFollow(author.id))
                .then(() => {
                    dispatch(fetchFollowTales());
                });
        } else if (currentUser) {
            dispatch(deleteFollow(followId))
                .then(() => {
                    dispatch(fetchFollowTales());
                });
        }
    }

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
                        <div className='feed-block-item author-fullname'>{author?.fullName}</div>
                        <Link to={`/tales/${tale.id}`} className='feed-block-item publish-date'>{getTimeDifference()}</Link>
                        {currentUser?.id && author?.id !== currentUser?.id &&
                            <div className='feed-block-item feed-block-follow' onClick={handleChartClick}>{typeOfFeed ? "Unchart User" : "Chart User" }</div>
                        }
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