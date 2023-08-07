import './Feed.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import RecommendedTopics from '../RecommendedTopics/index'
import FeedBlock from '../FeedBlock/index'
import AuthForm from '../AuthForm/index';
import { getAllTales, getFollowTales, fetchPublishedTales, fetchFollowTales } from '../../store/talesReducer';
import { getUsers, fetchUsers } from '../../store/usersReducer';
import { fetchFollows } from '../../store/followsReducer';
import { getConstellations, fetchConstellations } from '../../store/constellationsReducer';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Feed = props => {
    const dispatch = useDispatch();
    const { typeOfFeed } = useParams();

    let currentUser = JSON.parse(sessionStorage.currentUser);
    window.addEventListener('storage', () => currentUser = JSON.parse(sessionStorage.currentUser));

    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('sign-up');

    const handleForm = () => {
        const body = document.body;

        if (showForm) {
            body.style.overflow = 'hidden';

            return (
                <AuthForm formType={formType} setShowForm={setShowForm} setFormType={setFormType} />
            );
        } else {
            body.style.overflow = '';
        };
    };

    const handleChartedRedirect = e => {
        if (!currentUser) {
            e.preventDefault();
            setShowForm(true);
            setFormType("sign-in");
        }
    }

    const turnObjectIntoArr = object => {
        const objectArr = [];

        for (const obj in object) {
            objectArr.push(object[obj]);
        }

        return objectArr;
    }
    //returns an object of all tales
    const allTales = useSelector(getAllTales);
    const followTales = useSelector(getFollowTales);

    //returns an object of all users
    const users = useSelector(getUsers);

    //returns an object of all constellations
    const constellations = useSelector(getConstellations);

    const allTalesArr = turnObjectIntoArr(allTales);
    const followTalesArr = turnObjectIntoArr(followTales);
    const constellationsArr = turnObjectIntoArr(constellations);

    const [loading, setLoading] = useState(true);
    const [searched, setSearched] = useState(false);
    const [filteredTales, setFilteredTales] = useState(allTalesArr);

    const renderFeedBlocks = () => {
        if (!typeOfFeed) {
            return renderDiscoverFeedBlocks();
        } else {
            return renderFollowFeedBlocks();
        }
    };

    ////////////Need to update this to take out follows (and include some meteor staff AND REMOVE OWN ARTICLES????????)
    const renderDiscoverFeedBlocks = () => {
        return (
            <>
                {allTalesArr.map(tale => {
                    if (tale.publishTime && !followTales[tale.id]) {
                        return (
                            <FeedBlock 
                            key={tale.id} 
                            tale={tale} 
                            author={users[tale.authorId]} 
                            constellation={constellationsArr.find(constellation => constellation.taleId === tale.id)}
                            searched={searched}
                            setSearched={setSearched}
                            setFilteredTales={setFilteredTales} />
                        )
                    }
                })}
            </>
        )
    }

    ////////////Need to update this to include meteor staff
    const renderFollowFeedBlocks = () => {
        return (
            <>
                {followTalesArr.map(tale => {
                    if (tale.publishTime) {
                        return (
                            <FeedBlock 
                            key={tale.id} 
                            tale={tale} 
                            author={users[tale.authorId]} 
                            constellation={constellationsArr.find(constellation => constellation.taleId === tale.id)}
                            searched={searched}
                            typeOfFeed={typeOfFeed}
                            setSearched={setSearched}
                            setFilteredTales={setFilteredTales} />
                        )
                    }
                })}
            </>
        )
    }

    const handleRecommendedTopics = () => {
        if (searched) {
            const feedPage = document.body.querySelector('.feed-page');
            feedPage?.setAttribute('id', 'sidebar');

            return (
                <div className='feed-aside'>
                    <RecommendedTopics filteredTales={filteredTales} users={users} />
                </div>
            )
        }
    }

    //Handles Page Loading
    useEffect(() => {
        setLoading(true);

        if (!typeOfFeed) {
            dispatch(fetchPublishedTales())
                .then(() => {
                    if (currentUser) dispatch(fetchFollowTales());
                })
                .then(() => {
                    dispatch(fetchUsers());
                })
                .then(() => {
                    dispatch(fetchConstellations());
                })
                .then(() => {
                    setLoading(false);
                });
        } else {
            dispatch(fetchFollowTales())
                .then(() => {
                    if (currentUser) dispatch(fetchFollows());
                })
                .then(() => {
                    dispatch(fetchUsers());
                })
                .then(() => {
                    dispatch(fetchConstellations());
                })
                .then(() => {
                    setLoading(false);
                });
        }
    }, [typeOfFeed])

    if (loading) {
        return (
        <Loading />
    )} else return (
        <>
            {handleForm()}
            <SiteNavBar page='feed' searched={searched} setSearched={setSearched} allTalesArr={allTalesArr} setFilteredTales={setFilteredTales} setShowForm={setShowForm} setFormType={setFormType} />

            <div className='feed-page' id='no-sidebar'>
                <div className='feed'>
                    <div className='feed-switcher'>
                        <Link to='/feed/' id='feed-switcher-discover' className={typeOfFeed ? undefined : 'feed-switcher-selected'}>For you</Link>
                        <Link to='/feed/follows' id='feed-switcher-follow' className={typeOfFeed === 'follows' ? 'feed-switcher-selected' : undefined } onClick={handleChartedRedirect}>Charted</Link>
                    </div>
                    {renderFeedBlocks()}
                </div>
                {handleRecommendedTopics()}
            </div>
        </>
    );
}

export default Feed;