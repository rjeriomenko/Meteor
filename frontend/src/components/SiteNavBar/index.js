import './SiteNavBar.css';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';

const SiteNavBar = ({ page, savedVisibility }) => {
    const currentUser = JSON.parse(sessionStorage.currentUser);

    const handlePublish = () => {
    }

    const formatProfileRightBar = () => {
        if (currentUser) { 
            return (
                <div>PROFILE PIC</div>
            )
        } else {
            return (
                <>
                    <div>Sign up</div>
                    <div>Sign In</div>
                    <div>GET STARTED PIC</div>
                </>
            )
        }

    }

    const formatNavBarPartials = () => {
        let partialRightBar;
        let partialLeftBar;

        switch (page) {
            case 'publish':
                partialRightBar = (
                    <>
                        <div className='publish-button' onClick={handlePublish}>Publish</div>
                        <Link to='/#/'>...</Link>
                    </>
                )
                partialLeftBar = (
                    <>
                        <Link to='/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <div className='title-text'>
                            Draft in {currentUser.fullName}
                        </div>
                        <div className='saved-text' style={{visibility: savedVisibility}}>
                            Saved
                        </div>
                    </>
                )
                break;
            case 'show':
            case 'feed':
                partialRightBar = (
                    <div>WRITE</div>
                )
                partialLeftBar = (
                    <>
                        <Link to='/'>
                                <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                            </Link>
                        <input type='text' className='search-bar' defaultValue='Search Meteor' />
                    </>
                )
                break;
            default:
                partialRightBar = (
                    <>
                        <div className='publish-button' onClick={handlePublish}>Publish</div>
                        <Link to='/#/'>...</Link>
                    </>
                )
                partialLeftBar = (
                    <>
                        <Link to='/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <div className='title-text'>
                            Draft in {currentUser.fullName}
                        </div>
                    </>
                )
                break;
        }

        return { partialRightBar: partialRightBar,
            partialLeftBar: partialLeftBar}
    }

    const handleDifferentCSS = () => {
        if (page === 'publish') {
            return 'publish-nav-bar'
        } else {
            return 'site-nav-bar'
        }
    }

    const { partialLeftBar, partialRightBar } = formatNavBarPartials();

    return (
        <header className={handleDifferentCSS()}>
            <div className='site-header-content'>
                <div className= 'site-navbar-left'>
                    { partialLeftBar }
                </div>
                <div className='site-navbar-right'>
                    { partialRightBar }
                    { formatProfileRightBar() }
                </div>
            </div>
        </header>
    );
}

export default SiteNavBar;