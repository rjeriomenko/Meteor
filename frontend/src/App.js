import Home from './components/Home/index';
import Publish from './components/Publish/index';
import TaleShow from './components/TaleShow/index';
import Feed from './components/Feed/index';
import { Switch, Route } from 'react-router-dom';

const App = props => {
  return (
    <Switch>
      <Route path='/publish/:taleId?' component={Publish} />
      <Route path='/tales/:taleId' component={TaleShow} />
      <Route path='/feed/:typeOfFeed?' component={Feed} />
      <Route exact path='/' component={Home} />
    </Switch>
  );
}

export default App