import './HomeNavBar.css';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HomeNavBar = ({ setShowForm, setFormType }) => {
    const [scrollStatus, setScrollStatus] = useState("not-scrolled")

    const handleScroll = e => {
        const scrollPosition = window.scrollY;
        
        if(scrollPosition > 370) {
            setScrollStatus("scrolled")
        } else {
            setScrollStatus("not-scrolled")
        }
    }

    const handleSignUp = () => {
        setShowForm(true);
        setFormType("sign-up");
    }

    const handleSignIn = () => {
        setShowForm(true);
        setFormType("sign-in");
    }

    window.addEventListener('scroll', () => handleScroll())

    return (
        <header className='home-nav-bar' id={scrollStatus}>
            <div className='header-content'>
                <div className= 'logo-content'>
                    <Link to='/'>
                        <img src={logo} alt='Website Logo' className='logo-image'/>
                        <div className='logo-text'>
                            Meteor
                        </div>
                    </Link>
                </div>
                <div className='home-nav-links'>
                    <Link to='/feed/'>Our Story</Link>
                    <Link to='/publish/'>Write</Link>
                    <div onClick={handleSignIn}>Sign In</div>
                    <div className='get-started' onClick={handleSignUp} id={scrollStatus}>Get Started</div>
                </div>
            </div>
        </header>
    );
}

export default HomeNavBar;
