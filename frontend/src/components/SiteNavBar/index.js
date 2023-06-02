import './SiteNavBar.css';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SiteNavBar = props => {
    const currentUser = JSON.parse(sessionStorage.currentUser);  //CHANGE THIS TO USE USEEFFECT or PUT CURRENT USER IN PAGE LOADER

    const handlePublish = () => {

    }

    const formatNavBarRight = () => {
        return (
            <>
                <div className='publish' onClick={handlePublish}>Publish</div>
                <Link to='/#/'>...</Link>
                <Link to='/publish/'>BELL</Link>
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
                    <div className='saved-text'>
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