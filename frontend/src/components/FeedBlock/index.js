import './Feed.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import { getTale, fetchTale } from '../../store/talesReducer';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Feed = ({ taleId }) => {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser));

    const tale = useSelector(getTales(taleId));

    const [loading, setLoading] = useState(true);
    const [scrollToReload, setscrollToReload] = useState(300);

    // const renderContent = contentString => {
    //     const content = document.body.querySelector('.show-content')
    //     content.innerHTML = contentString;
    // }

    //Handles Page Loading
    useEffect(() => {
        dispatch(fetchTale(taleId))
        .then(() => {
            setLoading(false);
        });
    }, [])

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
        <div className='site-page'>
            <SiteNavBar page='show'/>

            <div className='tale-show'>
                <div contentEditable={false} className='show-content' />
            </div>
        </div>
    );
}

export default Feed;