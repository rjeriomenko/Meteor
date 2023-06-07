import './Feed.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import RecommendedTopics from '../RecommendedTopics/index'
import { getTales, fetchPublishedTales } from '../../store/talesReducer';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Feed = props => {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));

    const tales = useSelector(getTales); //returns an array of all tales

    const [loading, setLoading] = useState(true);
    const [scrollToReload, setscrollToReload] = useState(300);

    // const handleScrollUpdate = e => {
    //     const scrollPosition = window.scrollY;

    //     if (scrollPosition > 370) {
    //         setScrollStatus("scrolled")
    //     } else {
    //         setScrollStatus("not-scrolled")
    //     }
    // }

    window.dispatch = useDispatch();

    window.fetchPublishedTales = fetchPublishedTales

    const renderFeedBlocks = () => {
        console.log(tales);
    };

    //Handles Page Loading
    useEffect(() => {
        dispatch(fetchPublishedTales())
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
        <div className='feed-page'>
            <SiteNavBar page='feed'/>

            <div className='feed'>
                {renderFeedBlocks()}
            </div>

            <RecommendedTopics />

        </div>
    );
}

export default Feed;