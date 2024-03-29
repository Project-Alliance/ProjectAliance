
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AUTH, auth } from 'Types/User.types';
import './App.css';
import Auth from './View/Authentication/Auth';
import CreateOrganization from './View/CreateProjectForm/createOrganization';

require('react-web-vector-icons/fonts');
import Dashboard from 'renderer/View/Dashboard'
import { logout } from './Store/Actions/auth.action';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css'



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
    <>
    <ReactNotifications />
    <Router>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        {/* <AuthRoute path="/createProject">
          <CreateProject />
        </AuthRoute> */}
        {/* <AuthRoute path="/addmembers">
          <CreateOrganization />
        </AuthRoute> */}

        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
      </Switch>
    </Router>

    </>
  );
}
