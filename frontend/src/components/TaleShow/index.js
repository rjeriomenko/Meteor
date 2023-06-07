import './TaleShow.css';
import SiteNavBar from '../SiteNavBar/index';
import Loading from '../Loading/index';
import { getTale, fetchTale } from '../../store/talesReducer';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const TaleShow = props => {
    const dispatch = useDispatch();
    const { taleId } = useParams();

    const tale = useSelector(getTale(taleId));
    const contentString = tale?.content;

    const [loading, setLoading] = useState(true);

    const renderContent = contentString => {
        const content = document.body.querySelector('.show-content')
        content.innerHTML = contentString;
    }


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

export default TaleShow;