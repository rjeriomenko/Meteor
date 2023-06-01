import './SignUpForm.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, logoutUser } from '../../store/usersReducer';

const SignUpForm = props => {
    const dispatch = useDispatch()
    const formType = useParams()
    console.log(useParams())
    console.log("sessionStorage:")
    console.log(sessionStorage.currentUser)
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fullName, setFullName] = useState()
    
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.currentUser))
    console.log("currentUser:")
    console.log(currentUser)

    useEffect(() => {
        setCurrentUser(JSON.parse(sessionStorage.currentUser))  //THIS DOESN'T UPDATE BECAUSE IT NEEDS A LOCAL VARIABLE (WITH useSelector)
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        const dispatchFunction = createUser;
        const dispatchUser = {
            email: email,
            password: password,
            fullName: fullName
        }

        dispatch(dispatchFunction(dispatchUser))
    }

    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const onFullNameChange = e => {
        setFullName(e.target.value)
    }

    const handleSignOut = e => {
        dispatch(logoutUser(currentUser.id)) //SOMETHING HERE IN LOGOUT LEADS TO 422 UNPROCESSABLE (MAYBE RESPONSE FROM BACKEND?)
    }

    return (
        <div className="SignUpForm">
            <h2>Hello from SignUpForm</h2>
            <h3>Logged in as {currentUser ? currentUser.fullName : "null"}</h3>

            <form onSubmit={handleSubmit}>
                <label>Email
                    <input type='text' onChange={onEmailChange} value={email} />
                </label>

                <label>Password
                    <input type='text' onChange={onPasswordChange} value={password} />
                </label>

                <label>Full Name
                    <input type='text' onChange={onFullNameChange} value={fullName} />
                </label>

                <input type='submit' value="Sign Up"/>
            </form>

            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default SignUpForm;
