import './TaleShow.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import CometForm from '../CometForm';
import AuthForm from '../AuthForm/index';
import invertedLogo from '../../inverted-logo.png';
import comet from '../../comet.png';
import clearStar from '../../clear-star.png';
import goldStar from '../../gold-star.png';
import { getUser } from '../../store/usersReducer';
import { getTale, fetchTale, deleteTale } from '../../store/talesReducer';
import { getStars, fetchStars, createStar, deleteStar } from '../../store/starsReducer';
import { getComets, fetchComets } from '../../store/cometsReducer';
import { getConstellations, fetchConstellations, createTaleConstellation, updateConstellation, deleteConstellation } from '../../store/constellationsReducer';
import { fetchUser } from '../../store/usersReducer';
import { getFollows, fetchFollows, createFollow, deleteFollow } from '../../store/followsReducer';
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const TaleShow = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { taleId } = useParams();

    let currentUser = JSON.parse(sessionStorage.currentUser);
    window.addEventListener('storage', () => currentUser = JSON.parse(sessionStorage.currentUser));

    const turnObjectIntoArr = object => {
        const objectArr = [];

        for (const obj in object) {
            objectArr.push(object[obj]);
        }

        return objectArr;
    }

    const tale = useSelector(getTale(taleId));
    const title = tale?.title;
    const constellationsObj = useSelector(getConstellations);
    const constellationsArr = turnObjectIntoArr(constellationsObj);
    const constellation = constellationsArr.find(constellation => constellation.taleId === tale?.id);
    const author = useSelector(getUser(tale?.authorId));
    const stars = Object.values(useSelector(getStars));
    const starredByUser = stars.some((star) => {return star?.userId === currentUser.id}) ? true : false;
    const userStarId = starredByUser ? stars.find((star) => { return star?.userId === currentUser.id }).id : null;
    const starSource = starredByUser ? goldStar : clearStar;
    const numStars = Object.keys(useSelector(getStars)).length;
    const comets = useSelector(getComets);
    const cometsLength = Object.keys(comets)?.length;
    const contentString = tale?.content;
    
    const [showCometForm, setShowCometForm] = useState(false);
    const [showConstellationForm, setShowConstellationForm] = useState(false);
    const [constellationContent, setConstellationContent] = useState('');
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [authFormType, setAuthFormType] = useState('sign-up');
    const [loading, setLoading] = useState(true);

    const handleAuthForm = () => {
        const body = document.body;

        if (showAuthForm) {
            body.style.overflow = 'hidden';

            return (
                <AuthForm formType={authFormType} setShowForm={setShowAuthForm} setFormType={setAuthFormType} />
            );
        } else {
            body.style.overflow = '';
        };
    };

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
        const publishTime = new Date(tale?.publishTime);
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

    const handleCometForm = () => {
        if (showCometForm) {
            return (
                <CometForm taleId={taleId} setShowCometForm={setShowCometForm} setShowAuthForm={setShowAuthForm} setAuthFormType={setAuthFormType} comets={comets} cometsLength={cometsLength} currentUser={currentUser} />
            );
        }
    };

    const handleStarClick = () => {
        if (currentUser) {
            if (!starredByUser) {
                dispatch(createStar(taleId))
            } else {
                dispatch(deleteStar(userStarId))
            }
        } else {
            setShowAuthForm(true);
            setAuthFormType("sign-in");
        }
    }

    const handleChartClick = () => {
        if (currentUser) {
            if (!followedAuthor) {
                dispatch(createFollow(author.id))
                    .then(() => {
                        dispatch(fetchFollows());
                    });
            } else {
                dispatch(deleteFollow(followId))
                    .then(() => {
                        dispatch(fetchFollows());
                    });
            }
        } else {
            setShowAuthForm(true);
            setAuthFormType("sign-in");
        }
    }

    const handleDeleteClick = () => {
        dispatch(deleteTale(taleId))
            .then(() => {
                history.push(`/feed/`);
            })
    }

    const handleConstellationFormClick = () => {
        if (constellation) setConstellationContent(constellation?.name);
        setShowConstellationForm(!showConstellationForm);
    }

    const onConstellationContentChange = e => {
        setConstellationContent(e.target.value)
    }

    const renderConstellationAndForm = () => {
        if (showConstellationForm) {
            return (<>
                <input type="text" 
                    maxLength='16' 
                    size='16'
                    className='tale-show-constellation'
                    id='tale-show-constellation-form' 
                    value={constellationContent} 
                    onChange={onConstellationContentChange}>
                </input>
                <div className='feed-block-button feed-block-follow' onClick={handleSubmitConstellationForm}>
                    Set Constellation
                </div>
                <div className='feed-block-button feed-block-follow' onClick={handleConstellationFormClick}>
                    Cancel
                </div>
            </>)
        } else if (constellation) {
            return (<div id='tale-show-constellation' className='tale-show-constellation' onClick={handleConstellationFormClick}>
                {constellation.name}
            </div>)
        } else if (currentUser?.id === tale?.authorId) {
            return (<div className='tale-show-constellation' onClick={handleConstellationFormClick}>
                {"No Constellation"}
            </div>)
        }
    }

    const handleSubmitConstellationForm = () => {
        if (constellationContent.trim().length) {
            if (constellation) {
                const updatedConstellation = {
                    id: constellation.id,
                    name: constellationContent.trim()
                }
                dispatch(updateConstellation(updatedConstellation))
                    .then(() => {
                        setShowConstellationForm(false);
                    });
            } else {
                const newConstellation = {
                    taleId: tale.id,
                    name: constellationContent.trim()
                }
                dispatch(createTaleConstellation(tale.id, newConstellation))
                    .then(() => {
                        setShowConstellationForm(false);
                    });
            }
        } else {
            if (constellation) {
                dispatch(deleteConstellation(constellation.id))
                    .then(() => {
                        setShowConstellationForm(false);
                    });
                    //need double click handling
            }
        }
    }

    const renderContent = contentString => {
        const content = document.body.querySelector('.show-content');
        content.innerHTML = contentString;

        let focusedDiv = content.querySelector('.focused');
        while (focusedDiv) {
            focusedDiv.classList.remove('focused')
            focusedDiv = content.querySelector('.focused');
        }

        let contentTitle = content.querySelector('.publish-title-text');
        if (contentTitle) {
            contentTitle.setAttribute('id','show');
            if (contentTitle.innerText === "Title") contentTitle.innerText = title;
        } else {
            const defaultTitle = document.createElement('div');
            defaultTitle.className = ('input-div publish-title-text');
            defaultTitle.innerText = title;
            contentTitle = defaultTitle;
            const firstContentDiv = content.querySelector('.input-div:not(.publish-title-text)');
            firstContentDiv.insertAdjacentElement('beforebegin', defaultTitle);
        };

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
                    dispatch(fetchConstellations());
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
                {handleCometForm()}
                {handleAuthForm()}
                <SiteNavBar page='show' setShowForm={setShowAuthForm} setFormType={setAuthFormType} />

                <div className='tale-show'>
                    <div contentEditable={false} className='show-content' />
                    <div className='tale-show-sub-title-block'>
                        <div className='tale-show-author-block'>
                            {getAuthorPicture()}
                            <div className='feed-block-item author-fullname'>{author?.fullName}</div>
                            <div className='feed-block-item publish-date'>{getTimeDifference()}</div>
                            {author?.id !== currentUser?.id &&
                                <div className='feed-block-button feed-block-follow' onClick={handleChartClick}>
                                    {followedAuthor ? "Unchart User" : "Chart User"}
                                </div>
                            }
                            {author?.id === currentUser?.id &&
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
                            <div className='comet-block' onClick={() => {setShowCometForm(true)}}>
                                <img src={comet} alt='Comet' className='clear-comet' />
                                <div>{cometsLength}</div>
                            </div>
                            {renderConstellationAndForm()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaleShow;