import React, { useState } from 'react';
import {
  Container,
  Header,
  ProjectIcon,
  Row,
  Col,
  H1,
  H2,
} from 'renderer/Components/layout';
import {
  BrowserRouter as Router,
  Link,
  RouteComponentProps,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import { COLORS } from 'renderer/AppConstants';
import { useSelector, useDispatch } from 'react-redux';
import { GetGoals } from 'renderer/Store/Actions/Project.Goals';
import { Avatar } from '@mui/material';
import Profile from './Setting_Screens/Profile_Setting';


const defaultImage =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
}


export default function Settings({ ParentHistory, sideBar }: Props) {

  const dispatch = useDispatch();

  const projects = useSelector(({ Project }: any) =>
    Project?.data?.projects ? Project?.data?.projects : []
  );
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);
  const user = useSelector(({ auth }: any) => auth.user);

  React.useEffect(() => {
    dispatch(GetGoals(user.company, user.accessToken));
  }, []);
  return (
    <Container style={{ overflowY: 'scroll' }}>
      {/* Header Start  */}
      <Header style={{ justifyContent: 'space-between' }}>
        <Row>
          <ProjectIcon style={{ borderRadius: 10 }}>
            <img
              style={{ height: 35, width: 35 }}
              src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
              alt="firebase"
            />
          </ProjectIcon>
          <Col style={{ marginLeft: 5 }}>
            <H2 style={{ color: COLORS.primary }}>Settings</H2>

          </Col>
        </Row>
        <Row style={{ justifyContent: 'flex-end', alignItems: 'center' }}>

          <Avatar
            src={user?.profilePic ? user?.profilePic : defaultImage}
            variant="circular"
            style={{ marginRight: 10 }}
          />
        </Row>
      </Header>

      <div style={{marginTop:20,marginLeft:80}}>
        <Profile />
      </div>
    </Container>
  );
}
