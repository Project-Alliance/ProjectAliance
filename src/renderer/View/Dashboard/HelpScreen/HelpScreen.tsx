/* eslint-disable eqeqeq */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
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
import { Avatar } from '@mui/material';
import './HelpScreen.css';
import Accordion from './Accordion';
import { accordionData } from './Content_FAQ\'s';

const defaultImage =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

export default function HelpScreen() {
  const [selLink, setSelLink] = useState('/board');

  const dispatch = useDispatch();

  const projects = useSelector(({ Project }: any) =>
    Project?.data?.projects ? Project?.data?.projects : []
  );
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);
  const user = useSelector(({ auth }: any) => auth.user);

  return (
    <Container style={{ overflowY: 'scroll' }}>
      {/* Header Start  */}
      <Header
        style={{ justifyContent: 'space-between', backgroundColor: 'white' }}
      >
        <Row>
          <ProjectIcon style={{ borderRadius: 10 }}>
            <img
              style={{ height: 35, width: 35 }}
              src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
              alt="firebase"
            />
          </ProjectIcon>
          <Col style={{ marginLeft: 5 }}>
            <H2 style={{ color: COLORS.primary }}>Help</H2>
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

      <div style={{ marginTop: 20, marginLeft: 80 }}>
        <Row style={{ marginTop: 40, marginLeft: 190, marginBottom: 50 }}>
          <Col>
            <div
            className='HeadingFAQ'
              style={{
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#EBEBEB',
                color: 'white',
                width: 500,
                height: 50,
                marginTop: 5,
                backgroundColor: 'rgb(82, 151, 247)',
                fontFamily: 'Feather',
                borderRadius: 15,
                display: 'flex',
                justifyContent: 'center',
                marginLeft: 160,
                fontWeight: 'bold',
                fontSize: 30,
              }}
            >
              FAQ's
            </div>
          </Col>
        </Row>
        <div className="accordion">
            {accordionData.map(({ title, content }) => (
              <Accordion title={title} content={content} />
            ))}
        </div>
      </div>
    </Container>
  );
}
