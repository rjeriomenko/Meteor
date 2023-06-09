import './HomeTrending.css'
import trending from '../../trending.png';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/usersReducer';



const HomeTrending = props => {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser))

    // useEffect(() => {  //ULTIMATELY DELETE THIS
    //     setCurrentUser(JSON.parse(sessionStorage.currentUser))  //THIS DOESN'T UPDATE BECAUSE IT NEEDS A LOCAL VARIABLE (WITH useSelector)
    // }, [])

    // const handleSignOut = e => {
    //     dispatch(logoutUser(currentUser.id))
    // }

    return (
        <>
            <div className="home-trending">
                <div className="home-trending-content">
                    <div className='home-trending-title-block'>
                        <img src={trending} alt='Trending image' className='trending-image' />
                        <h2 className='home-trending-title'>Trending on Meteor</h2>
                    </div>
                    <div className='home-trending-blocks'>
                        <div className='trend-block'>1</div>
                        <div className='trend-block'>2</div>
                        <div className='trend-block'>3</div>
                        <div className='trend-block'>4</div>
                        <div className='trend-block'>5</div>
                        <div className='trend-block'>6</div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default HomeTrending;
