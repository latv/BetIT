import React from 'react';
import DefaultLayout from 'components/DefaultLayout';
import Login from './pages/Login';
import { BrowserRouter, Switch } from 'react-router-dom';

import ProtectecteRoute from 'components/ProtectedRoute';
import LoginRoute from 'components/LoginRoute';
const App = () => {
  return (
    <>

      <BrowserRouter>

      <Switch>
        <LoginRoute  exact path="/login" component={Login} />
        <ProtectecteRoute path="/" component={DefaultLayout} />
      </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
