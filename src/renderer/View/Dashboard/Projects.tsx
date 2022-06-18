import PropTypes from "prop-types"
import React, { useEffect,  useState } from 'react';
import Icon from 'react-web-vector-icons';

import AvatarGroup from 'react-avatar-group';
import {
  useHistory,
} from 'react-router-dom';
import { ButtonUnstyled } from '@mui/base';
import { links} from "./SideBarButtonsSetails"


import Board from './Board';
import { useSelector } from 'react-redux';
import { COLORS } from "renderer/AppConstants";
import ReportingScreen from "./Reporting";


function Projects({ sideBar = 'flex', ...props }) {
  const [selLink, setSelLink] = useState('/graph');
  const history = useHistory();
  const item = useSelector(
    ({ SelectedProject }: any) => SelectedProject
  );
  const user = useSelector(({ auth }: any) => auth.user);
  useEffect(() => {}, []);
  return (

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
            <div className="row-view" style={{ marginLeft: 10 }}>
              {links.map((item, index) => {
                return (
                  <ButtonUnstyled

                    key={index * Math.random()}
                    className="btn"
                    style={{
                      color: item.to == selLink ? COLORS.primary:'black',
                      fontFamily: 'Manrope',
                      fontSize: 14,
                      borderBottomWidth: 4,
                      outline: 'none',
                      borderBottomColor: "#149fff",
                      borderStyle: item.to == selLink ? 'solid' : 'none',
                    }}
                    onClick={() => setSelLink(item.to)}
                  >
                    {item.label}
                  </ButtonUnstyled>
                );
              })}
            </div>
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
      {selLink=="/board"&&<div className="main-container-project-management">
           <Board />
      </div>}
      {selLink=="/graph"&&<ReportingScreen header={false} />}
      </div>


  );
}

Projects.propTypes = {
  sideBar: PropTypes.string
}

export default Projects;
