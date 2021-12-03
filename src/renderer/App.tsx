import React from 'react';
import { useSelector } from 'react-redux';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AUTH } from 'Types/User.types';
import './App.css';
import Auth from './View/Authentication/Auth';
import CreateOrganization from './View/CreateOrganization/createOrganization';
import CreateProject from './View/createProject/createProject';
require('react-web-vector-icons/fonts');

function AuthRoute({ children, ...rest }: any) {
  const user = useSelector(({ auth }: AUTH) => auth.user);
  const onlyChild = React.Children.only(children);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        {/* <AuthRoute path="/createProject">
          <CreateProject />
        </AuthRoute> */}
        <AuthRoute path="/createOrganization">
          <CreateOrganization />
        </AuthRoute>
        <AuthRoute path="/dashboard">
          <CreateProject />
        </AuthRoute>
      </Switch>
    </Router>
  );
}
