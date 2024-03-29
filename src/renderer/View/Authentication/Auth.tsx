// import path from 'path';
import { Col, Row } from 'react-bootstrap';
import {
  Route,
  MemoryRouter as Router,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import { AppLogo, AuthBackPic } from '../../Constant/Images';
import { Register, SignIn, ForgotPassword,PasswordReset } from './';
import React from 'react';
import { useSelector } from 'react-redux';
import { AUTH } from 'Types/User.types';
// import Loader from 'renderer/Components/Loader/Loader';

export default function Auth() {

  const user = useSelector(({auth}:AUTH) => {

    return auth.user;
  });


  const history = useHistory();
  if (user) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="Container">
      <Row className="row">
        {/* Img Tag */}
        <Col className="col-5 col1 LeftSide">
          {/* <img src={AppLogo} className="AppLogoAuth" alt="background" /> */}
          <img className="LeftSidePic" src={AuthBackPic} alt="back" />
          {/* <div className="copyRightText">&copy;2021, Made by Dream Lab. </div> */}
        </Col>
        {/* Auth Routing  */}
        <Col className="col col1">
          <Router>
            <Switch>
              <Route component={SignIn} path="/" exact />
              <Route component={Register} path="/Register" />
              <Route component={ForgotPassword} path="/ForgotPassword" />
              <Route component={PasswordReset} path="/PasswordReset" />
            </Switch>
          </Router>
        </Col>
      </Row>
    </div>
  );
}
