import React from 'react';
import './createOrganization.scss';
import { CardActionArea } from '@mui/material';
import {
  Route,
  MemoryRouter as Router,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { Mark } from '../../Constant/Images';
import { Col, Row } from 'react-bootstrap';

import CreateOrganizationCom from 'renderer/View/CreateProjectForm/CreateOrganizationCom';
import AddMembers from './AddMembers';

function AddMemberRoute() {
  const history = useHistory();

  return (
    <div className="Container">
      <Row className="row">
        <Col className="col col1">
            <AddMembers history={history} />

        </Col>

        <Col className="col-5 col1 LeftSide">
          <img className="RightSidePic" src={Mark} alt="back" />
        </Col>
      </Row>
    </div>
  );
}

export default AddMemberRoute;
