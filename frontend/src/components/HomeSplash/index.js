import './HomeSplash.css';
import splashGif from '../../splash.gif';


const HomeSplash = ({ setShowForm, setFormType }) => {

    const handleSignUp = () => {
        setShowForm(true);
        setFormType("sign-up");
    }

    return (
        <div className='home-splash'>
            <div className='home-splash-left'>
                <h1 className='home-greeting'>Stay curious.</h1>
                <h2 className='home-sub-greeting'>Discover stories, thinking, and expertise from writers on any topic.</h2>
                <div className='start-reading' onClick={handleSignUp}>Start Reading</div>
            </div>
            <div className='home-splash-right'>
                <img src={splashGif} alt='Splash Gif' className='splash-gif' />
            </div>
        </div>

    );
}

export default HomeSplash;
