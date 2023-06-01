import './NavBar.css';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = props => {
    const [scrollStatus, setScrollStatus] = useState("not-scrolled")

    const handleScroll = e => {
        const scrollPosition = window.scrollY;
        
        if(scrollPosition > 360) {
            setScrollStatus("scrolled")
        } else {
            setScrollStatus("not-scrolled")
        }
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
                    <Link to='/form/login'>Sign In</Link>
                    <Link to='/form/sign-up' className='get-started' id={scrollStatus}>Get Started</Link>
                </div>
            </div>
        </header>

    );
}

export default NavBar;
