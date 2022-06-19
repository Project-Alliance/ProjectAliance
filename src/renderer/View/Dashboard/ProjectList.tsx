/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState, Component } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import Icon from 'react-web-vector-icons';
import AccountCircle from '@mui/material/Icon';
import AddProjectForm from 'renderer/View/CreateProjectForm/addProjectForm';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProjects,
  CreateProjects,
} from 'renderer/Store/Actions/Project.action';
import { COLORS, size } from 'renderer/AppConstants';
import Api from 'renderer/Api/auth.api';
import { notify } from 'renderer/Store/ReduxToolkit/Notification';
import { Row } from 'react-bootstrap';
import UpdateProject from '../CreateProjectForm/updateProjectForm';

const ProjectList = (props: any) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector(({ Project }: any) => Project.data?.projects);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const user = useSelector(({ auth }: any) => auth.user);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      <div className="main-container-sub-Home" style={{ overflowX: 'hidden' }}>
        {/*  Top Header  */}
        <AddProjectForm isOpen={isOpen} setIsOpen={setIsOpen} />
        {selectedProject&&<UpdateProject isOpen={isOpenUpdate} setIsOpen={setIsOpenUpdate} data={selectedProject} setSelectedProject={setSelectedProject}  />}

        <div
          style={{
            display: 'flex',
            marginLeft: props?.sideBar == 'flex' ? 20 : 60,
            justifyContent: 'space-between',
            height: size.headerHeight,
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Manrope',
              color: '#149fff',
              display: 'flex',
            }}
          >
            Projects
          </div>
          {/* <div style={{ width: '50%', marginTop: '22px' }}>
            <Search />
          </div> */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            {/* <div style={{ marginTop: '5px' }}>
                <Dropdown selected={selected} setSelected={setSelected} />
              </div> */}


          </div>
        </div>
        {/* Used for separate Upper Header  */}
        <div className="sepratorRight" />
        {/* Middile Headings  */}

        {/* Left Phase User Info  */}

        <div
          style={{

            width: '100%',
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <button
            onClick={(props: any) => {
              // props.ParentHistory.push('/createOrganization');
              setIsOpen(!isOpen);
            }}
            className="Create-Project-Div"
          >
            <div className="Left-Create-Project">
              <Icon name="plus" font="AntDesign" color="#898686" size={25} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '20px',
              }}
            >
              <h4 style={{ fontSize: '20px', color: '#898686' }}>
                Create Project
              </h4>
            </div>
          </button>
          {/* list */}
          {projects?.map((item: any, index: any) => {
            return (
             <div style={{padding:0,margin:0,alignItems:'center',justifyContent:'space-between',display:'flex',flexDirection:'row',marginLeft:10,marginRight:10}}>
               <button
                key={item.projectTitle + ' ' + index}
                className="Create-Project-Div"
                onClick={() => {
                  props.setBtnName('/Projects');
                  dispatch({ type: 'SELECT_PROJECT', project: { ...item } });
                  dispatch({ type: 'PROJECT_SCREEN' });
                  history.push({ pathname: '/Projects', state: { item } });
                }}
              >
                <div className="Left-Create-Project">
                  <Icon
                    name={item.pIconName || 'bars'}
                    font="AntDesign"
                    color="#898686"
                    size={25}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '20px',
                  }}
                >
                  <h4 style={{ fontSize: '20px', color: '#898686' }}>
                    {item.projectTitle}
                  </h4>
                </div>
              </button>
              <div onClick={()=>{
                console.log(item)
                setSelectedProject(item)
                setIsOpenUpdate(true)}} style={{display:'flex',alignItems:'center'}}>
                <Icon name="edit" font="AntDesign" color={COLORS.primary} size={25} />
              </div>
             </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
