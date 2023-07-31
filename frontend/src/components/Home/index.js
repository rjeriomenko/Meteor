import './Home.css';
import HomeSplash from '../HomeSplash/index';
import HomeTrending from '../HomeTrending/index';
import HomeNavBar from '../HomeNavBar/index';
import AuthForm from '../AuthForm/index';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = props => {
    // uncomment these lines once logout has been made sync
    // const history = useHistory();
    // let currentUser = JSON.parse(sessionStorage.currentUser);
    // if (currentUser) history.replace('/feed/');

    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('sign-up');

    const handleForm = () => {
        const body = document.body;

        if (showForm) {
            body.style.overflow = 'hidden';
            
            return (
                <AuthForm formType={formType} setShowForm={setShowForm} setFormType={setFormType} />
            );
        } else {
            body.style.overflow = '';
        };
    };

    return (
        <div className="home">
            {handleForm()}
            <HomeNavBar setShowForm={setShowForm} setFormType={setFormType} />
            <HomeSplash setShowForm={setShowForm} setFormType={setFormType} />
            {/* <HomeTrending /> */}
        </div>
    );
}

export default Home;
