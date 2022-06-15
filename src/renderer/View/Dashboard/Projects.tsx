import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-web-vector-icons';
import DropDownMenuSelect from 'renderer/Components/DropDownMenue';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import AvatarGroup from 'react-avatar-group';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';

import Board from './Board';
import { useSelector } from 'react-redux';


function Projects({ sideBar = 'flex', ...props }) {
  const [selLink, setSelLink] = useState('/board');
  const history = useHistory();
  const { state } = useLocation<any>();
  const { item }: any = state;
  const user = useSelector(({ auth }: any) => auth.user);
  useEffect(() => {}, []);
  return (
    <Router>
      <div className="main-container-sub">
        {/* Project TopBar or TAbs */}
        <div
          className="project-topbar row-view"
          style={{ justifyContent: 'space-between' }}
        >
          {/* project titl and and links would be avalible here */}
          <div
            className="project-title-links-bar"
            style={{
              marginLeft: sideBar == 'flex' ? 20 : 60,
              justifyContent: 'flex-end',
            }}
          >
            <div className="row-view jc ai" style={{ }}>
              {/* Project icone , name  , status , add faviorite , list down to setup project settings */}
              <div className="project-logo">
                {/*  Project Icon */}
                <Icon
                  font="FontAwesome"
                  name="tasks"
                  size={25}
                  color="#FFFFFF"
                />
              </div>
              <div className="Project-title">{item.projectTitle}</div>




            </div>
            {/* links */}

          </div>
          <div className="row-view ai jc" style={{ marginRight: 30 }}>


            <div
              onClick={()=>history.push("/ManageTeam")}
              className="btn"
              style={{
                marginLeft: 10,
                height: 30,
                width: 80,
                marginRight: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                border: '1px solid rgb(175, 173, 173)',
                color: 'rgb(175, 173, 173)',
                outline: 'none',
              }}
            >
              <Icon
                name="plus"
                font="AntDesign"
                color="rgb(175, 173, 173)"
                size={20}
              />
              Invites
            </div>


            <AvatarGroup
              avatars={[user.name]}
              initialCharacters={1}
              max={1}
              backgroundColor="#a12ee1"
              size={40}
              displayAllOnHover={false}
              shadow={2}
            />
          </div>
        </div>

      <div className="seprator" style={{ marginTop: 0 }} />
      {/* <div className="main-container-project-management">
           <Board />
      </div> */}
      </div>
    </Router>
  );
}

export default Projects;
