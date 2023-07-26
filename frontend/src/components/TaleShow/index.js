import './TaleShow.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import CometForm from '../CometForm';
import invertedLogo from '../../inverted-logo.png';
import comet from '../../comet.png';
import clearStar from '../../clear-star.png';
import goldStar from '../../gold-star.png';
import { getUser } from '../../store/usersReducer';
import { getTale, fetchTale, deleteTale } from '../../store/talesReducer';
import { getStars, fetchStars, createStar, deleteStar } from '../../store/starsReducer';
import { getComets, fetchComets } from '../../store/cometsReducer';
import { fetchUser } from '../../store/usersReducer';
import { getFollows, fetchFollows, createFollow, deleteFollow } from '../../store/followsReducer';
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const TaleShow = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { taleId } = useParams();
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));

    const tale = useSelector(getTale(taleId));
    const author = useSelector(getUser(tale?.authorId));
    const stars = Object.values(useSelector(getStars));
    const starredByUser = stars.some((star) => {return star?.userId === currentUser.id}) ? true : false;
    const userStarId = starredByUser ? stars.find((star) => { return star?.userId === currentUser.id }).id : null;
    const starSource = starredByUser ? goldStar : clearStar;
    const numStars = Object.keys(useSelector(getStars)).length;
    const comets = useSelector(getComets);
    const cometsLength = Object.keys(comets)?.length;
    const contentString = tale?.content;
    
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const follows = useSelector(getFollows)
    let followedAuthor = false;
    let followId;
    if (currentUser && author) {
        const followTuple = Object.entries(follows)
            .filter(([tupleFollowId, follow]) => follow.followerId === currentUser.id && follow.followeeId === author.id)[0];
        if (followTuple) {
            followedAuthor = true;
            followId = followTuple[0];
        }
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

    const getAuthorPicture = () => {
        return (
            <img src={invertedLogo} alt='Default Author Picture' className='tale-show-author-picture' />
        )
    }

    const handleForm = () => {
        if (showForm) {
            return (
                <CometForm taleId={taleId} setShowForm={setShowForm} comets={comets} cometsLength={cometsLength} currentUser={currentUser} />
            );
        }
    };

    const handleStarClick = () => {
        if (currentUser && !starredByUser) {
            dispatch(createStar(taleId))
        } else {
            dispatch(deleteStar(userStarId))
        }
    }

    const handleChartClick = () => {
        if (!followedAuthor) {
            dispatch(createFollow(author.id))
                .then(() => {
                    dispatch(fetchFollows());
                });
        } else if (currentUser) {
            dispatch(deleteFollow(followId))
                .then(() => {
                    dispatch(fetchFollows());
                });
        }
    }

    const handleDeleteClick = () => {
        history.push(`/feed/`);
        dispatch(deleteTale(taleId));
    }

    const renderContent = contentString => {
        const content = document.body.querySelector('.show-content');
        content.innerHTML = contentString;

        const contentTitle = content.querySelector('.publish-title-text');
        contentTitle.setAttribute('id','show');

        const subTitleBlock = document.body.querySelector('.tale-show-sub-title-block');
        contentTitle.insertAdjacentElement('afterend', subTitleBlock);
    }


    //Handles Page Loading
    useEffect(() => {
        dispatch(fetchTale(taleId))
    }, [])

    useEffect(() => {
        if (tale) {
            dispatch(fetchUser(tale.authorId))
                .then(() => {
                    dispatch(fetchStars(taleId));
                })
                .then(() => {
                    dispatch(fetchComets(taleId));
                })
                .then(() => {
                    if (currentUser) dispatch(fetchFollows());
                })
                .then(() => {
                    setLoading(false);
                });
        }
    }, [tale])
    

    //Handles preparing Tale text and event listeners
    useEffect(() => {
        if (!loading) {
            renderContent(contentString);
        }
    }, [loading])

    if (loading) {
        return (
        <Loading />
    )} else return (
        <>
            <div className='site-page'>
                {handleForm()}
                <SiteNavBar page='show'/>

                <div className='tale-show'>
                    <div contentEditable={false} className='show-content' />
                    <div className='tale-show-sub-title-block'>
                        <div className='tale-show-author-block'>
                            {getAuthorPicture()}
                            <div className='feed-block-item author-fullname'>{author.fullName}</div>
                            <div className='feed-block-item publish-date'>{getTimeDifference()}</div>
                            {currentUser?.id && author?.id !== currentUser?.id &&
                                <div className='feed-block-button feed-block-follow' onClick={handleChartClick}>
                                    {followedAuthor ? "Unchart User" : "Chart User"}
                                </div>
                            }
                            {currentUser?.id && author?.id === currentUser?.id &&
                            <>
                                <Link to={`/publish/${taleId}`} className='feed-block-button feed-block-follow'>
                                    Edit
                                </Link>
                                <div className='feed-block-button feed-block-follow' onClick={handleDeleteClick}>
                                    Delete
                                </div>
                            </>
                            }
                        </div>

                        <div className='tale-show-click-bar'>
                            <div className='star-block' onClick={handleStarClick}>
                                <img src={starSource} alt='Star' className='clear-star' />
                                <div>{numStars}</div>
                            </div>
                            <div className='comet-block' onClick={() => {setShowForm(true)}}>
                                <img src={comet} alt='Comet' className='clear-comet' />
                                <div>{cometsLength}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaleShow;