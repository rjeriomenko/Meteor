import './CometForm.css';
import CometBlock from '../CometBlock';
import { getUsers, fetchUsers } from '../../store/usersReducer';
import close from '../../close.png'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComet } from '../../store/cometsReducer';
import { useHistory } from 'react-router-dom';

const CometForm = ({ taleId, setShowForm, comets, cometsLength, currentUser }) => {
    const dispatch = useDispatch();
    console.log(comets)
    //SEE IF COMETS UPDATES (SEE IF OTHER PROBLEM CROPS UP)
    
    const history = useHistory();
    const users = useSelector(getUsers);

    const turnObjectIntoArr = object => {
        const objectArr = [];

        for (const obj in object) {
            objectArr.push(object[obj]);
        }

        return objectArr;
    }

    const cometsArr = turnObjectIntoArr(comets);
    
    const [content, setContent] = useState('');

    const handleCometClick = e => {
        e.preventDefault();

        if (currentUser) {
            const comet = {
                taleId: taleId,
                content: content
            }
            dispatch(createComet(comet));

            //MAKE SUBMIT BUTTON FADE INTO DARKER GREEN
            //SETSHOWTEXTINPUT FALSE
        } else {
            history.push('/')
        }
    }

    const onContentChange = e => {
        setContent(e.target.value)
    }

    const handleCloseForm = e => {
        const className = e.target.className;

        if (className === 'comet-modal-background' || className === 'comet-form-close') {
            const form = document.body.querySelector('.comet-modal-background');
            setTimeout(() => {
                setShowForm(false);
            }, 160);
        }
    }

    const renderCometBlocks = () => {
        return (
            <>
                {cometsArr.map(comet => (
                    <CometBlock key={comet.id} comet={comet} author={users[comet.userId]} users={users} />
                ))}
            </>
        )
    };

    useEffect(() => {
        dispatch(fetchUsers);
    }, [])

    return (
        <div className='comet-modal-background' onClick={handleCloseForm}>
            <div className='comet-form-container'>
                <div className='comet-form-spacing'>
                    <div className='comet-form-content'>
                        <form className='comet-form' onSubmit={handleCometClick}>
                            <textarea onChange={onContentChange} value={content} className='comet-form-text-input' placeHolder='What are your thoughts?'>
                            </textarea>

                            <input type='submit' value='Respond' className='comet-form-submit' />
                        </form>

                        <div className='comet-form-border'></div>
                        <div className='comet-feed'>
                            {renderCometBlocks()}
                        </div>
                    </div>
                </div>
                <div className='comet-form-comet-count'>Responses ({cometsLength})</div>
                <img src={close} className='comet-form-close'></img>
            </div>
        </div>
    );
}

export default CometForm;
