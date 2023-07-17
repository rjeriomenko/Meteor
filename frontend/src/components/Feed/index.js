import './Feed.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import RecommendedTopics from '../RecommendedTopics/index'
import FeedBlock from '../FeedBlock/index'
import { getTales, fetchPublishedTales } from '../../store/talesReducer';
import { getUsers, fetchUsers } from '../../store/usersReducer';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Feed = props => {
    const dispatch = useDispatch();
    const { typeOfFeed } = useParams();


    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));

    const turnObjectIntoArr = object => {
        const objectArr = [];

        for (const obj in object) {
            objectArr.push(object[obj]);
        }

        return objectArr;
    }
    //returns an object of all tales
    const tales = useSelector(getTales);

    //returns an object of all users
    const users = useSelector(getUsers);

    const talesArr = turnObjectIntoArr(tales);

    const [loading, setLoading] = useState(true);
    const [searched, setSearched] = useState(false);
    const [filteredTales, setFilteredTales] = useState(talesArr);

    const renderFeedBlocks = () => {
        if (!typeOfFeed) {
            return renderDiscoverFeedBlocks();
        } else {
            return renderFollowFeedBlocks();
        }
    };

    ////////////Need to update this to take out follows (and include some meteor staff AND REMOVE OWN ARTICLES)
    const renderDiscoverFeedBlocks = () => {
        return (
            <>
                {talesArr.map(tale => {
                    if (tale.publishTime) {
                        return (
                            <FeedBlock key={tale.id} tale={tale} author={users[tale.authorId]} />
                        )
                    }
                })}
            </>
        )
    }

    ////////////Need to update this to include ONLY follows (and meteor staff)
    const renderFollowFeedBlocks = () => {
        return renderDiscoverFeedBlocks()
    }

    const handleRecommendedTopics = () => {
        if (searched) {
            const feedPage = document.body.querySelector('.feed-page');
            feedPage.setAttribute('id', 'sidebar');

            return (
                <div className='feed-aside'>
                    <RecommendedTopics filteredTales={filteredTales} users={users} />
                </div>
            )
        }
    }

    //Handles Page Loading
    useEffect(() => {
        dispatch(fetchPublishedTales())
            .then(() => {
                return dispatch(fetchUsers());
            })
            .then(() => {
                setLoading(false);
            });
    }, [])

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
        <>
            <SiteNavBar page='feed' searched={searched} setSearched={setSearched} talesArr={talesArr} setFilteredTales={setFilteredTales}/>

            <div className='feed-page' id='no-sidebar'>
                <div className='feed'>
                    <div className='feed-switcher'>
                        <Link to='/feed/' id='feed-switcher-discover' className={!typeOfFeed && 'feed-switcher-selected'}>For you</Link>
                        <Link to='/feed/follows' id='feed-switcher-follow' className={typeOfFeed === 'follows' && 'feed-switcher-selected'}>Following</Link>
                    </div>
                    {renderFeedBlocks()}
                </div>
                {handleRecommendedTopics()}
            </div>
        </>
    );
}

export default Feed;