import { Switch, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm/index';
import Home from './components/Home/index';
import NavBar from './components/NavBar/index';
import { useState } from 'react';

const App = props => {

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('sign-up');

  const handleForm = () => {
    const body = document.body

    if (showForm) {
      body.style.overflow = 'hidden';

      return (
        <AuthForm formType={formType} setShowForm={setShowForm} setFormType={setFormType} />
      );
    } else {
      body.style.overflow = 'visible';
    };
  };

  return (
    <>
      {handleForm()}

      <NavBar setShowForm={setShowForm} setFormType={setFormType} />

      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </>

  );
}

export default App
