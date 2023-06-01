import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/index';
import NavBar from './components/NavBar/index';
import LoginForm from './components/LoginForm/index'
import SignUpForm from './components/SignUpForm/index'

const App = props => {

  return (
    <>
      <NavBar />

      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/form/sign-up' component={SignUpForm} />
      </Switch>
    </>

  );
}

export default App
