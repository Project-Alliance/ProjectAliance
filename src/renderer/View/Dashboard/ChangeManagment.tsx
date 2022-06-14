import { Avatar } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  H1,
} from 'renderer/Components/layout';
import { COLORS, size } from 'renderer/AppConstants';

import "./style.scss";
import Icon from 'react-web-vector-icons';
import { ChangeButtons, option } from './SideBarButtonsSetails';


import AvatarGroup from 'react-avatar-group';
import { ButtonUnstyled } from '@mui/base';
import { useHistory } from 'react-router';
// import QualityPlaning from './QualityPlaning';
import ChangePlanning from './ChangePlanning';
import ChangeReq from './ChangeReq';


const Change = ({sideBar = 'flex', ...props }) => {


  const [selLink, setSelLink] = useState('/ChangeRequirement');

  let history = useHistory();


  const projects = useSelector(({ Project }: any) =>
    Project?.data?.projects ? Project?.data?.projects : []
  );

  const user = useSelector(({ auth }: any) => auth.user);
  const DefaultProject = useSelector(
    ({ SelectedProject }: any) => SelectedProject
  );
  const [selectedProject, setSelectedProject] = React.useState(
    DefaultProject?.pid != undefined ? DefaultProject : projects[0]
  );


  // Gannt Chart coding detail

  return (
    <div style={{overflowY:'scroll'}} className="Main_Task_List">
      {/* <TodoList /> */}
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
            <div className="row-view ai">
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
              <H1>{selectedProject?.projectTitle}</H1>
              {/* <DropDownMenuSelect
                values={option}
                handleOnClick={() => {
                  console.log('drop down');
                }}
              /> */}

                <div
                  style={{
                    marginLeft: 1,
                    cursor: 'pointer',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                  onClick={() => {}}
                >
                  <Icon
                    name="dot-single"
                    font="Entypo"
                    color="green"
                    size={25}
                  />
                  Change Management
                </div>

            </div>
            {/* links */}
            <div className="row-view" style={{ marginLeft: 10 }}>
              {ChangeButtons.map((item, index) => {
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
              avatars={[user?.name]}
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
        <>
        {selLink=="/ChangeRequirement"&&<ChangeReq />}
        {selLink=="/ChangePlanning"&&<ChangePlanning />}
        </>

    </div>
  );
};

export default Change;
