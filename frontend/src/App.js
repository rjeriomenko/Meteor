import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/index';
import Publish from './components/Publish/index';

const App = props => {
  

  return (
    <Switch>
      <Route path='/publish' component={Publish} />
      <Route exact path='/' component={Home} />
    </Switch>
  );
}

export default App