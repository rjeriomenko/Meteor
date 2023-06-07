import './Loading.css';
import logo from '../../logo.png';
import loading from '../../loading.gif';

const Loading = props => {
    return (
        <div className='loading'>
            <div className= 'logo-content'>
                <img src={logo} alt='Website Logo' className='loading-logo-image'/>
                <div className='loading-logo-text'>
                    Meteor
                </div>
            </div>

        <img src={loading} alt='Loading' className='loading-image' />
        </div>
    );
}

export default Loading;
