import './AuthForm.css';
import close from '../../close.png'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser, loginUser, loginUserAndRedirect } from '../../store/usersReducer';

const AuthForm = ({ formType, setShowForm, setFormType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

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

        //empty input field error handling
        if ((dispatchFunction === loginUser && email.length && password.length) ||
            (dispatchFunction === createUser && email.length && password.length && fullName.length)) {
            let currentUser;

            dispatch(dispatchFunction(dispatchUser))
                .then (() => {
                    currentUser = JSON.parse(sessionStorage.currentUser)
                    if(currentUser) {
                        setShowForm(false);
    
                        history.push('/feed/');
    
                        document.body.style.overflow = '';
                    }
                })
        }
    }

    const handleDemoLogin = e => {
        e.preventDefault();
        
        const demoUser = {
            email: 'demo@man.com',
            password: 'brimstone',
        }
        
        dispatch(loginUserAndRedirect(demoUser, '/feed/', history));

        setShowForm(false);

        document.body.style.overflow = '';
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
                return 'Enter your email address, password, and full name to create an account.';
        };
    };

    const formInput = () => {
        switch (formType) {
            case ('sign-up'):
                return (
                    <>
                        <label className='auth-label'>Your email
                            <input type='text' onChange={onEmailChange} value={email} className='auth-text-input' />
                        </label>

                        <label className='auth-label'>Your password
                            <input type='text' onChange={onPasswordChange} value={password} className='auth-text-input' />
                        </label>

                        <label className='auth-label'>Your full name
                            <input type='text' onChange={onFullNameChange} value={fullName} className='auth-text-input' />
                        </label>
                    </>
                )
            case ('sign-in'):
                return (
                    <>
                        <label className='auth-label'>Your email
                            <input type='text' onChange={onEmailChange} value={email} className='auth-text-input' />
                        </label>

                        <label className='auth-label'>Your password
                            <input type='text' onChange={onPasswordChange} value={password} className='auth-text-input' />
                        </label>
                    </>
                )
            default:
                return (
                    <>
                        <label className='auth-label'>Your email
                            <input type='text' onChange={onEmailChange} value={email} className='auth-text-input' />
                        </label>

                        <label className='auth-label'>Your password
                            <input type='text' onChange={onPasswordChange} value={password} className='auth-text-input' />
                        </label>

                        <label className='auth-label'>Your full name
                            <input type='text' onChange={onFullNameChange} value={fullName} className='auth-text-input' />
                        </label>
                    </>
                )
        }
    };

    return (
        <div className='modal-background' onClick={handleCloseForm}>
            <div className='auth-container'>
                <div className='auth-spacing'>
                    <div className='auth-content'>
                        <h2 className='form-header'>{formHeader()}</h2>
                        
                        <h4 className='form-instructions'>{formInstructions()}</h4>

                        <form className='auth-form' onSubmit={handleSubmit}>
                            {formInput()}
                            <input type='submit' value='Continue' className='auth-submit'/>
                            <button onClick={handleDemoLogin} className='auth-submit demo-login'>Demo Login
                            </button>
                        </form>
                    </div>
                </div>

                <img src={close} className='auth-close'></img>
            </div>
        </div>
    );
}

export default AuthForm;
