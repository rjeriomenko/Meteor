import './CometForm.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComet } from '../../store/cometsReducer';
import { useHistory } from 'react-router-dom';

const CometForm = ({ taleId, setShowForm, comets, currentUser }) => {
    console.log(comets)
    //SEE IF COMETS UPDATES (SEE IF OTHER PROBLEM CROPS UP)
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [content, setContent] = useState('');

    const handleCometClick = e => {
        e.preventDefault();

        if (currentUser) {
            const comet = {
                taleId: taleId,
                content: "this is a comet"
            }
            dispatch(createComet(comet));

            //MAKE SUBMIT BUTTON FADE INTO DARKER GREEN
            //SETSHOWTEXTINPUT FALSE

            document.body.style.overflow = '';
        } else {
            history.push('/')
        }
    }

    const onContentChange = e => {
        setContent(e.target.value)
    }

    const handleCloseForm = e => {
        const className = e.target.className;

        if (className === 'modal-background') {
            const form = document.body.querySelector('.modal-background');
            form.id = 'closing';
            form.style.opacity = '1';
            form.style.opacity = '0';
            setTimeout(() => {
                setShowForm(false);
            }, 160);
        }
    }

    return (
        <div className='modal-background' onClick={handleCloseForm}>
            <div className='auth-container'>
                <div className='auth-spacing'>
                    <div className='auth-content'>
                        <h2 className='form-header'>FORM HEADER</h2>
                        
                        <h4 className='form-instructions'>FORM INSTRUCTIONS</h4>

                        <form className='auth-form' onSubmit={handleCometClick}>
                            <label className='auth-label'>YOUR CONTENT
                                <input type='text' onChange={onContentChange} value={content} className='auth-text-input' />
                            </label>

                            <input type='submit' value='Respond' className='auth-submit'/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CometForm;
