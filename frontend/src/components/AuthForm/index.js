import './AuthForm.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser, loginUser } from '../../store/usersReducer';

const AuthForm = ({ formType, setShowForm, setFormType }) => {
    const dispatch = useDispatch()

    console.log('sessionStorage:')
    console.log(sessionStorage.currentUser)
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fullName, setFullName] = useState()

    const handleSubmit = e => {
        e.preventDefault()

        let dispatchFunction;

        switch (formType) {
            case ('sign-up'):
                dispatchFunction = createUser;
                break;
            case ('sign-in'):
                dispatchFunction = loginUser;
                break;
            default:
                dispatchFunction = createUser;
                break;
        };

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

    const handleCloseForm = e => {
        const className = e.target.className;

        if (className === 'auth-close' || className === 'modal-background') {
            const form = document.body.querySelector('.modal-background');
            form.id = 'closing';
            form.style.opacity = '1';
            form.style.opacity = '0';
            setTimeout(() => {
                setShowForm(false);
            }, 160);
        }
    }

    const formHeader = () => {
        switch (formType) {
            case ('sign-up'):
                return 'Sign up with email';
            case ('sign-in'):
                return 'Sign in with email';
            default: 
                return 'Sign up with email';
        };
    };

    const formInstructions = () => {
        switch (formType) {
            case ('sign-up'):
                return 'Enter your email address, password, and full name to create an account.';
            case ('sign-in'):
                return 'Enter the email address and password associated with your account to login.';
            default:
                return 'Enter the email address and associated with your account,';
        };
    };

    const formInput = () => {
        switch (formType) {
            case ('sign-up'):
                return (
                    <>
                        <label className='form'>Your email
                            <input type='text' onChange={onEmailChange} value={email} className='text-input' />
                        </label>

                        <label className='form'>Your password
                            <input type='text' onChange={onPasswordChange} value={password} className='text-input' />
                        </label>

                        <label className='form'>Your full name
                            <input type='text' onChange={onFullNameChange} value={fullName} className='text-input' />
                        </label>
                    </>
                )
            case ('sign-in'):
                return (
                    <>
                        <label className='form'>Your email
                            <input type='text' onChange={onEmailChange} value={email} className='text-input' />
                        </label>

                        <label className='form'>Your password
                            <input type='text' onChange={onPasswordChange} value={password} className='text-input' />
                        </label>
                    </>
                )
            default:
                return (
                    <>
                        <label className='form'>Your email
                            <input type='text' onChange={onEmailChange} value={email} className='text-input' />
                        </label>

                        <label className='form'>Your password
                            <input type='text' onChange={onPasswordChange} value={password} className='text-input' />
                        </label>

                        <label className='form'>Your full name
                            <input type='text' onChange={onFullNameChange} value={fullName} className='text-input' />
                        </label>
                    </>
                )
        }
    };

    return (
        <div className='modal-background' onClick={handleCloseForm}>
            <div className='auth-form'>
                <div className='auth-container'>
                    <div className='auth-content'>
                        <h2 className= 'form-header'>{formHeader()}</h2>
                        
                        <h4 className= 'form-instructions'>{formInstructions()}</h4>

                        <form onSubmit={handleSubmit}>
                            {formInput()}
                            <input type='submit' value='Continue' className='continue'/>
                        </form>
                    </div>
                </div>

                <div className='auth-close'>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
