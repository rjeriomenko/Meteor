import './SearchBlock.css';
import Loading from '../Loading/index';
import logo from '../../logo.png';
import invertedLogo from '../../inverted-logo.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SearchBlock = ({ tale, author }) => {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));
    const [loading, setLoading] = useState(false);

    const getAuthorPicture = () => {
        return (
            <img src={invertedLogo} alt='Default Author Picture' className='feed-block-item author-picture' />
        )
    }

    const getIntro = () => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = tale.content;
        const introDiv = tempElement.querySelector('.input-div:not(.publish-title-text)');
        const intro = introDiv.textContent.slice(0, 80) + '...';

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
        <div className='search-block'>
            <div className='feed-block-content'>
                <div className='search-block-content-text'>
                    <div className='feed-block-author'>
                        {getAuthorPicture()}
                        <div className='feed-block-item author-fullname'>{author.fullName}</div>
                        <Link to={`/tales/${tale.id}`} className='feed-block-item publish-date'>{getTimeDifference()}</Link>
                    </div>
                    <Link to={`/tales/${tale.id}`}>
                            <div className='feed-block-item feed-block-title'>
                                {tale.title}
                            </div>
                            {getIntro()}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchBlock;