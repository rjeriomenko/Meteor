import './SiteNavBar.css';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';

const SiteNavBar = ({ page, savedVisibility }) => {
    const currentUser = JSON.parse(sessionStorage.currentUser);  //CHANGE THIS TO PUT CURRENT USER IN PAGE LOADER

    const handlePublish = () => {

    }

    const formatNavBarRight = () => {
        let partialBar;

        switch (page) {
            case 'publish':
                partialBar = (
                    <>
                        <div className='publish-button' onClick={handlePublish}>Publish</div>
                        <Link to='/#/'>...</Link>
                    </>
                )
                break;
            case 'feed':
                partialBar = (
                    null
                )
                break;
            default:
                partialBar = (
                    <>
                        <div className='publish' onClick={handlePublish}>Publish</div>
                        <Link to='/#/'>...</Link>
                    </>
                )
                break;
        }

        return (
            <>
                {partialBar}
                <div>PROFILE PIC</div>
            </>
        )
    }

    return (
        <header className='site-nav-bar'>
            <div className='site-header-content'>
                <div className= 'site-navbar-left'>
                    <Link to='/'>
                        <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                    </Link>
                    <div className='title-text'>
                        Draft in {currentUser.fullName}
                    </div>
                    <div className='saved-text' style={{visibility: savedVisibility}}>
                        Saved
                    </div>
                </div>
                <div className='site-navbar-right'>
                    {formatNavBarRight()}
                    
                </div>
            </div>
        </header>
    );
}

export default SiteNavBar;