/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState, Component } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
// import Search from 'renderer/Components/SearchBar';
import Dropdown from 'renderer/Components/DropDown';
import Icon from 'react-web-vector-icons';
import AccountCircle from '@mui/material/Icon';
// import { relative } from 'path/posix';
import AvatarGroup from 'react-avatar-group';
// import { Profile } from '../../Constant/Images';
import InputButton from 'renderer/Components/InputButton';
import DropDownMenuSelect from 'renderer/Components/DropDownMenue';
import { option } from './SideBarButtonsSetails';
import AddProjectForm from 'renderer/View/CreateProjectForm/addProjectForm';
import { useHistory } from 'react-router-dom';
// import ProjectTables from 'renderer/Components/Product_Listing';
import { ProjectCollabrator } from './SideBarButtonsSetails';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProjects,
  CreateProjects,
} from 'renderer/Store/Actions/Project.action';
import DataGridDemo from 'renderer/Components/PeopleGrid_View/Home_Grid_View';
import Button from 'renderer/Components/Button';
import { getMembers } from 'renderer/Store/Actions/members.action';
import WorkINProgress from './Work';
import { size } from 'renderer/AppConstants';
import Api from 'renderer/Api/auth.api';

const Home = (props: any) => {
  const [selected, setSelected] = useState('Rehan');
  let history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector(({ Project }: any) => Project.data?.projects);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(({ auth }: any) => auth.user);
  const Members = useSelector(({ Members }: any) => Members.data);
  const getMonth = (month: any) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month];
  };
  let date = new Date();
  const [email, setEmail] = useState<any>([]);
  const getMails = async () => {
    try {
      let res = await Api.getReceivedMail(user?.accessToken);
      if (res.status == 200) {
        setEmail(res.data);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (email.length === 0) {
      getMails();
    }
  }, [email]);
  var day = new Date();
  var hr = day.getHours();
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <div className="main-container-sub-Home" style={{ overflowX: 'hidden' }}>
        {/*  Top Header  */}
        <AddProjectForm isOpen={isOpen} setIsOpen={setIsOpen} />

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
            Home
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

            <div
              style={{
                marginLeft: 20,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <div className="Bell-icon">
                <Icon name="bell" font="EvilIcons" color="#B0C3CC" size={32} />
              </div>
              <div
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  backgroundColor: '#149fff',
                  marginTop: 12,
                  position: 'relative',
                  marginLeft: -10,
                }}
              />
            </div>
          </div>
        </div>
        {/* Used for separate Upper Header  */}
        <div className="sepratorRight" />
        {/* Middile Headings  */}
        <div className="Top-Heading">
          <div
            style={{
              fontFamily: 'Inter,sans-serif',
              fontSize: '16px',
              fontStyle: 'bold',
            }}
          >
            <h4>{`${date.toLocaleDateString('en', {
              weekday: 'long',
            })}, ${getMonth(date.getMonth())} ${date.getDate()}`}</h4>
          </div>
          <div
            style={{
              fontFamily: 'Inter,sans-serif',
              fontSize: '30px',
              fontStyle: 'medium',
              marginTop: 10,
            }}
          >
            <h1>
              {hr >= 0 && hr < 12
                ? 'Good Morning  '
                : hr >= 12 && hr < 16
                ? 'Good Afternoon  '
                : 'Good Evening '}
              {user?.name}
            </h1>
          </div>

          <div className="Top-Team_Detail">
            <div
              style={{ width: '30%', display: 'flex', flexDirection: 'row' }}
            >
              <div style={{ fontFamily: 'inherit', fontStyle: 'normal' }}>
                Total Projects {projects?.length}
              </div>
            </div>

            <div className="sepratorNew" />

            <div
              style={{ width: '38%', display: 'flex', flexDirection: 'row' }}
            >
              <div style={{ marginLeft: '7px' }}>
                <Icon name="check" font="FontAwesome" color="black" size={25} />
              </div>
              <div
                style={{
                  marginLeft: '7px',
                  fontSize: '14px',
                  marginTop: '6px',
                }}
              >
                Completed Projects{' '}
                {
                  projects?.filter(
                    (project: any) => project.status === 'Completed'
                  ).length
                }
              </div>
            </div>

            <div className="sepratorNew" />

            <div
              style={{
                width: '32%',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '6px',
              }}
            >
              <div style={{ marginLeft: '7px' }}>
                <Icon
                  name="person-outline"
                  font="MaterialIcons"
                  color="black"
                  size={25}
                />
              </div>
              <div
                style={{
                  marginLeft: '7px',
                  fontSize: '16px',
                  marginTop: '8px',
                }}
              >
                {Members?.length} Collaborators
              </div>
            </div>
          </div>
        </div>

        {/* Left Phase User Info  */}

        <div className="Project-Phase">
          <div className="Divide-Phase">
            <div className="Top-Divide-Phase">
              <div className="Avatar-Div">
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
              <div className="Avatar-Name-Icon">
                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                  <h6 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Unread Mail
                  </h6>
                </div>
                <div style={{ marginLeft: '10px', marginTop: '8px' }}>
                  <Icon name="user" font="Entypo" color="black" size={18} />
                </div>
              </div>
            </div>
            <div style={{ overflow: 'hidden', overflowY: 'scroll' }}>
              {email &&
                email
                  .filter((mail: any) => !mail?.isRead)
                  .map((mail: any) => (
                    <div
                      onClick={() => {
                        history.push('/mailbox');
                      }}
                      style={{
                        backgroundColor: '#ffff',
                        padding: 10,
                        fontWeight: 'bold',
                      }}
                      className="emailRow"
                    >
                      <Icon
                        name="mail"
                        font="AntDesign"
                        color={'#000'}
                        size={25}
                        style={{ marginRight: 5 }}
                      />
                      {mail.title}
                    </div>
                  ))}
            </div>
          </div>
          {/* Right Phase Create Project Phase  */}
          <div className="Divide-Phase">
            <div className="Top-Left-Divide-Phase jc_sb">
              <div className="Top-Left-Divide-Phase">
                <div style={{ marginTop: 15, marginLeft: '25px' }}>
                  <h4 style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    Projects
                  </h4>
                </div>
              </div>

              <button
                className="btn"
                onClick={() =>
                  dispatch(getProjects(user.company, user.accessToken))
                }
              >
                <Icon
                  name="refresh"
                  size={25}
                  color="#000"
                  font="MaterialCommunityIcons"
                />
              </button>
            </div>
            <div className="sepratorRight" />
            {/* Projects List */}
            <div
              style={{
                height: '300px',
                width: '100%',
                overflow: 'hidden',
                overflowY: 'scroll',
                paddingBottom: 50,
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
                  <Icon
                    name="plus"
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
                    Create Project
                  </h4>
                </div>
              </button>
              {/* list */}
              {projects?.map((item: any, index: any) => {
                return (
                  <button
                    key={item.projectTitle + ' ' + index}
                    className="Create-Project-Div"
                    onClick={() => {

                      props.setBtnName("/Projects");
                    dispatch({type:"SELECT_PROJECT",project:{...item}})
                     dispatch({type:"PROJECT_SCREEN"})
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
                );
              })}
            </div>
          </div>
        </div>

        <div className="People-project-Div">
          <div
            style={{
              width: '100%',
              height: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div
                style={{
                  margin: '20px 0px  0px 40px',
                  fontSize: '25px',
                  fontWeight: 'bold',
                }}
              >
                People
              </div>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <InputButton
                onClick={() => {
                  // getData()
                  history.push('/addmembers');
                }}
                className="Create-Button"
                buttonStyle={{
                  backgroundImage: ` linear-gradient(to right, #0905AF 0%, #0905AF 47%, #0905AF 100%)`,
                  boxShadow: `3.994px 22.651px 57px rgba(97, 73, 205, 0.259)`,
                  color: '#FFFFFF',
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="ADD"
              />
            </div>
          </div>

          <div className="People-project">
            <DataGridDemo data={Members} />
          </div>
          {/* <div>
            <ProjectTables />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
