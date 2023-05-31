import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/index';
import NavBar from './components/NavBar/index';

const App = props => {

  return (
    <>
      <NavBar />

      <h1>Hello from App</h1>

      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </>

  );
}

export default App
