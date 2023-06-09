import './TaleShow.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import CometForm from '../CometForm';
import logo from '../../logo.png';
import comet from '../../comet.png';
import clearStar from '../../clear-star.png';
import goldStar from '../../gold-star.png';
import { getUser } from '../../store/usersReducer';
import { getTale, fetchTale } from '../../store/talesReducer';
import { getStars, fetchStars, createStar } from '../../store/starsReducer';
import { getComets, fetchComets } from '../../store/cometsReducer';
import { fetchUsers, fetchUser } from '../../store/usersReducer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const TaleShow = props => {
    const dispatch = useDispatch();
    const { taleId } = useParams();

    const tale = useSelector(getTale(taleId));
    const author = useSelector(getUser(tale?.authorId));
    const stars = Object.keys(useSelector(getStars)).length;
    const comets = useSelector(getComets);
    const cometsLength = Object.keys(comets)?.length;
    const contentString = tale?.content;
    
    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));
    const [loading, setLoading] = useState(true);

    const getAuthorPicture = () => {
        return (
            <img src={logo} alt='Default Author Picture' className='tale-show-author-picture' />
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
        if (currentUser) {
            const star = document.body.querySelector('.clear-star');
            star.src=goldStar;
            dispatch(createStar(taleId));
        }
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
                            <div className='feed-block-item publish-date'>.PUBDATE</div>
                        </div>

                        <div className='tale-show-click-bar'>
                            <div className='star-block' onClick={handleStarClick}>
                                <img src={clearStar} alt='Star' className='clear-star' />
                                <div>{stars}</div>
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