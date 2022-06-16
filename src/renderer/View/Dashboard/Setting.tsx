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
import Display from './Setting_Screens/Display';
import Notifications from './Setting_Screens/Notification_Setting';
import Account from './Setting_Screens/Account_Settings';

const defaultImage =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
}

const links = [
  {
    to: '/Profile',
    label: 'Profile',
  },
  {
    to: '/Notifications',
    label: 'Notifications',
  },
  {
    to: '/Account',
    label: 'Account',
  },
  {
    to: '/Display',
    label: 'Display',
  },
];

export default function Settings({ ParentHistory, sideBar }: Props) {
  const [selLink, setSelLink] = useState('/board');

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
            <Row style={{ alignItems: 'center' }}>
              <H1>{selectedProject?.projectTitle}</H1>
              <select
                style={{ width: 15, height: 20, border: 'none', marginLeft: 5 }}
                value={selectedProject?.pid}
                onChange={(e) =>
                  setSelectedProject(
                    projects.filter(
                      (item: any) => item.pid == e.target.value
                    )[0]
                  )
                }
              >
                {projects?.map((item: any) => (
                  <option value={item.pid}>{item.projectTitle}</option>
                ))}
              </select>
            </Row>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <input
            style={{
              width: 200,
              marginRight: 10,
              borderWidth: 1,
              borderColor: COLORS.borderColor,
              borderRadius: 20,
              height: 30,
              padding: 10,
            }}
            placeholder="Search"
          />
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
