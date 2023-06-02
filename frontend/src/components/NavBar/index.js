import './NavBar.css';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = ({ setShowForm, setFormType }) => {
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
        <header className='nav-bar' id={scrollStatus}>
            <div className='header-content'>
                <div className= 'logo-content'>
                    <Link to='/'>
                        <img src={logo} alt='Website Logo' className='logo-image'/>
                        <div className='logo-text'>
                            Meteor
                        </div>
                    </Link>
                </div>
                <div className='nav-links'>
                    <Link to='/#/'>Our Story</Link>
                    <Link to='/#/'>Write</Link>
                    <div onClick={handleSignIn}>Sign In</div>
                    <div className='get-started' onClick={handleSignUp} id={scrollStatus}>Get Started</div>
                </div>
            </div>
        </header>

    );
}

export default NavBar;
