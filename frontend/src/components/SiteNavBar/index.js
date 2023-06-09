import './SiteNavBar.css';
import logo from '../../logo.png';
import write from '../../write.png';
import { Link } from 'react-router-dom';

const SiteNavBar = ({ page, savedVisibility, handlePublish, searched, setSearched }) => {
    const currentUser = JSON.parse(sessionStorage.currentUser);

    const handleSearch = e => {
        console.log(searched)
        e.preventDefault();
        setSearched(false);
        setSearched(true);
    }

    const formatProfileRightBar = () => {
        if (currentUser) { 
            return (
                <>
                    <div className="site-navbar-profile-picture">{currentUser.fullName.slice(0, 1)}</div>
                </>
            )
        } else {
            return (
                <>
                    {/* <div>Sign up</div>
                    <div>Sign In</div>
                    <div>GET STARTED PIC</div> */}
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
                    </>
                )
                partialLeftBar = (
                    <>
                        <Link to='/feed/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <div className='title-text'>
                            Draft by {currentUser.fullName}
                        </div>
                        <div className='saved-text' style={{visibility: savedVisibility}}>
                            Saved
                        </div>
                    </>
                )
                break;
            case 'show':
                partialRightBar = (
                    <Link to='/publish/' className='publish-link'>
                        <img src={write} alt='Write' className='site-navbar-write' />
                        Write
                    </Link>
                )
                partialLeftBar = (
                    <>
                        <Link to='/feed/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <form onSubmit={handleSearch}>
                            <input type='text' className='search-bar' placeholder='Search Meteor'/>
                        </form>
                    </>
                )
                break;
            case 'feed':
                partialRightBar = (
                    <Link to='/publish/' className='publish-link'>
                        <img src={write} alt='Write' className='site-navbar-write' />
                        Write
                    </Link>
                )
                partialLeftBar = (
                    <>
                        <Link to='/feed/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <form onSubmit={handleSearch}>
                            <input type='text' className='search-bar' placeholder='Search Meteor'/>
                        </form>
                    </>
                )
                break;
            default:
                partialRightBar = (
                    <>
                        <div className='publish-button' onClick={handlePublish}>Publish</div>
                    </>
                )
                partialLeftBar = (
                    <>
                        <Link to='/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <div className='title-text'>
                            Draft by {currentUser.fullName}
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