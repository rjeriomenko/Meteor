import './NavBar.css'
import logo from '../../logo.png'
import { Link } from 'react-router-dom'

const NavBar = props => {

    return (
        <header>
            <div class='header-content'>
                <div class= 'logo-content'>
                    <Link to='/'>
                        <img src={logo} alt='Website Logo' class='logo-image'/>
                        <div class='logo-text'>
                            Meteor
                        </div>
                    </Link>
                </div>
                <div class='nav-links'>
                    <Link to='#/'>Our Story</Link>
                    <Link to='#/'>Write</Link>
                    <Link to='#/'>Sign In</Link>
                    <Link to='#/' class="get-started">Get Started</Link>
                </div>
            </div>
        </header>

    );
}

export default NavBar;
