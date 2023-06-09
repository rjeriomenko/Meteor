import './Feed.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import RecommendedTopics from '../RecommendedTopics/index'
import FeedBlock from '../FeedBlock/index'
import { getTales, fetchPublishedTales } from '../../store/talesReducer';
import { getUsers, fetchUsers } from '../../store/usersReducer';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Feed = props => {
    const dispatch = useDispatch();

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
    const [scrollToReload, setscrollToReload] = useState(300);

    const renderFeedBlocks = () => {
        return (
            <>
                {talesArr.map(tale => (
                    <FeedBlock key={tale.id} tale={tale} author={users[tale.authorId]} />
                ))}
            </>
        )
    };

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
            <SiteNavBar page='feed'/>

            <div className='feed-page'>
                <div className='feed'>
                    {renderFeedBlocks()}
                </div>
                <div className='feed-aside'>
                    <RecommendedTopics />
                </div>
            </div>
        </>
    );
}

export default Feed;