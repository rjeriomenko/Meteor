import './HomeTrending.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/usersReducer';



const HomeTrending = props => {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser))

    useEffect(() => {  //ULTIMATELY DELETE THIS
        setCurrentUser(JSON.parse(sessionStorage.currentUser))  //THIS DOESN'T UPDATE BECAUSE IT NEEDS A LOCAL VARIABLE (WITH useSelector)
    }, [])

    const handleSignOut = e => {
        dispatch(logoutUser(currentUser.id))
    }

    return (
        <>
            <div className="home-trending">
                <br/>
                <h2>Trending on Medium</h2>
                <br/>
                <br/>
                <br/>
                <ul>
                    <li>Proof that login works:</li>
                </ul>

                <button onClick={handleSignOut}>Sign Out</button>

                <h3>Logged in as {currentUser ? currentUser.fullName : 'null'}</h3>
            </div>
        </>

    );
}

export default HomeTrending;
