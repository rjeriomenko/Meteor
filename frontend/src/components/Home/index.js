import './Home.css'
import HomeSplash from '../HomeSplash/index';
import HomeTrending from '../HomeTrending/index';

const Home = props => {

    return (
        <div className="home">
            <HomeSplash/>
            <HomeTrending />
        </div>
    );
}

export default Home;
