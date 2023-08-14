import './SiteNavBar.css';
import Fuse from 'fuse.js';
import logo from '../../logo.png';
import githubLogo from '../../github-logo.png';
import linkedinLogo from '../../linkedin-logo.png';
import write from '../../write.png';
import AuthForm from '../AuthForm/index';
import { logoutUser } from '../../store/usersReducer';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SiteNavBar = ({ page, savedVisibility, handlePublish, searched, setSearched, setFilteredTales, allTalesArr, setShowForm, setFormType }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [submitting, setSubmitting] = useState(false);

    let currentUser = JSON.parse(sessionStorage.currentUser);
    window.addEventListener('storage', () => currentUser = JSON.parse(sessionStorage.currentUser));

    const handleSearch = e => {
        e.preventDefault();
        const value = document.body.querySelector('.search-bar').value;
        const fuse = new Fuse(allTalesArr, { keys: ['title'] });
        const results = fuse.search(value).map((result) => result.item);

        setFilteredTales(results);
        setSearched(true);
    }

    const handleLogout = e => {
        if (currentUser && !submitting) {
            setSubmitting(true);
            dispatch(logoutUser(currentUser.id))
                .then(() => {
                    history.push('/');
                })
        } else if (!submitting) {
            setShowForm(true);
            setFormType("sign-in");
        }
    }

    const handlePublishRedirect = e => {
        if (!currentUser) {
            e.preventDefault();
            setShowForm(true);
            setFormType("sign-in");
        }
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
                        <div className='publish-button logout-button' onClick={handleLogout}>{currentUser ? "Logout" : "Login"}</div>
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
                        <Link to={{ pathname: 'https://github.com/rjeriomenko' }} target="_blank">
                            <img src={githubLogo} alt='GitHub Link' className='site-navbar-github-image' />
                        </Link>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/rokas-jeriomenko-82b312121/' }} target="_blank">
                            <img src={linkedinLogo} alt='LinkedIn Link' className='site-navbar-linkedin-image' />
                        </Link>
                    </>
                )
                break;
            case 'show':
                partialRightBar = (
                    <>
                        <div className='publish-button logout-button' onClick={handleLogout}>{currentUser ? "Logout" : "Login"}</div>
                        <Link to='/publish/' className='publish-link' onClick={handlePublishRedirect}>
                            <img src={write} alt='Write' className='site-navbar-write' />
                            Write
                        </Link>
                    </>
                )
                partialLeftBar = (
                    <>
                        <Link to='/feed/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <Link to={{ pathname: 'https://github.com/rjeriomenko' }} target="_blank">
                            <img src={githubLogo} alt='GitHub Link' className='site-navbar-github-image' />
                        </Link>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/rokas-jeriomenko-82b312121/' }} target="_blank">
                            <img src={linkedinLogo} alt='LinkedIn Link' className='site-navbar-linkedin-image' />
                        </Link>
                    </>
                )
                break;
            case 'feed':
                partialRightBar = (
                    <>
                        <div className='publish-button logout-button' onClick={handleLogout}>{currentUser ? "Logout" : "Login"}</div>
                        <Link to='/publish/' className='publish-link' onClick={handlePublishRedirect}>
                            <img src={write} alt='Write' className='site-navbar-write' />
                            Write
                        </Link>
                    </>
                )
                partialLeftBar = (
                    <>
                        <Link to='/feed/'>
                            <img src={logo} alt='Website Logo' className='site-navbar-logo-image' />
                        </Link>
                        <form onSubmit={handleSearch}>
                            <input type='text' className='search-bar' placeholder='Search Meteor'/>
                        </form>
                        <Link to={{ pathname: 'https://github.com/rjeriomenko' }} target="_blank">
                            <img src={githubLogo} alt='GitHub Link' className='site-navbar-github-image' />
                        </Link>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/rokas-jeriomenko-82b312121/' }} target="_blank">
                            <img src={linkedinLogo} alt='LinkedIn Link' className='site-navbar-linkedin-image' />
                        </Link>
                    </>
                )
                break;
            default:
                partialRightBar = (
                    <>
                        <div className='publish-button logout-button' onClick={handleLogout}>{currentUser ? "Logout" : "Login"}</div>
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
                        <div className='saved-text' style={{ visibility: savedVisibility }}>
                            Saved
                        </div>
                        <Link to={{ pathname: 'https://github.com/rjeriomenko' }} target="_blank">
                            <img src={githubLogo} alt='GitHub Link' className='site-navbar-github-image' />
                        </Link>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/rokas-jeriomenko-82b312121/' }} target="_blank">
                            <img src={linkedinLogo} alt='LinkedIn Link' className='site-navbar-linkedin-image' />
                        </Link>
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