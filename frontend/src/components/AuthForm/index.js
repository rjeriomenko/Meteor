import './AuthForm.css';
import close from '../../close.png'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser, loginUser, loginUserAndRedirect } from '../../store/usersReducer';
import emailValidator from 'email-validator';

const AuthForm = ({ formType, setShowForm, setFormType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const clearErrors = () => {
        const errors = document.querySelectorAll('.error-div');
        if (errors) errors.forEach(error => { error.remove() });
    }

    const createErrorDiv = (element, text) => {
        const errorDiv = document.createElement("div");
        errorDiv.className = 'error-div';
        errorDiv.textContent = text;

        element.insertAdjacentElement('afterend', errorDiv);
    }

    const handleErrors = invalidCredentials => {
        clearErrors();

        let emailErrors = false;
        let passwordErrors = false;
        let fullNameErrors = false;

        const form = document.body.querySelector('.auth-form');
        const email = form.querySelector('#email');
        const password = form.querySelector('#password');
        const fullName = form.querySelector('#full-name');

        if (invalidCredentials) {
            return createErrorDiv(password, 'Incorrect email or password.');
        }

        //Handles empty field errors
        [email, password, fullName].forEach((element, idx) => {
            if (element && !element.value.length) {
                createErrorDiv(element, 'Field cannot be blank.');
                if (idx === 0) emailErrors = true;
                if (idx === 1) passwordErrors = true;
                if (idx === 2) fullNameErrors = true;
            }
        })

        //Handles invalid entry format and lengths.
        if (!emailErrors && !emailValidator.validate(email.value)) {
            createErrorDiv(email, 'Not a valid email.');
            emailErrors = true;
        }

        if (!emailErrors && email.value.length > 255) {
            createErrorDiv(email, 'Email is too long.');
            emailErrors = true;
        }

        if (!passwordErrors && password.value.length < 6) {
            createErrorDiv(password, 'Password is too short.');
            passwordErrors = true;
        }

        if (!passwordErrors && password.value.length > 255) {
            createErrorDiv(password, 'Password is too long.');
            passwordErrors = true;
        }

        if (fullName && !fullNameErrors && fullName.value.length < 2) {
            createErrorDiv(fullName, 'Invalid Full Name.');
            fullNameErrors = true;
        }

        if (fullName && !fullNameErrors && fullName.value.length > 255) {
            createErrorDiv(fullName, 'Full Name is too long.');
            fullNameErrors = true;
        }

        if (!document.querySelectorAll('.error-div').length) return false;
        return true;
    }

    const handleSubmit = e => {
        e.preventDefault();

        let currentUser = JSON.parse(sessionStorage.currentUser);
        if (currentUser) history.push('/feed/');

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

        const anyErrors = handleErrors();

        const dispatchUser = {
            email: email,
            password: password,
            fullName: fullName
        }

        if (!anyErrors) {
            dispatch(dispatchFunction(dispatchUser))
                .then (() => {
                    currentUser = JSON.parse(sessionStorage.currentUser)
                    if(currentUser) {
                        setShowForm(false);
    
                        history.push('/feed/');
    
                        document.body.style.overflow = '';
                    }
                    else {
                        handleErrors(true);
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
                            <input type='text' onChange={onEmailChange} value={email} className='auth-text-input' id='email' />
                        </label>

                        <label className='auth-label'>Your password
                            <input type='password' onChange={onPasswordChange} value={password} className='auth-text-input' id='password' />
                        </label>

                        <label className='auth-label'>Your full name
                            <input type='text' onChange={onFullNameChange} value={fullName} className='auth-text-input' id='full-name' />
                        </label>
                    </>
                )
            case ('sign-in'):
                return (
                    <>
                        <label className='auth-label'>Your email
                            <input type='text' onChange={onEmailChange} value={email} className='auth-text-input' id='email' />
                        </label>

                        <label className='auth-label'>Your password
                            <input type='password' onChange={onPasswordChange} value={password} className='auth-text-input' id='password' />
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
