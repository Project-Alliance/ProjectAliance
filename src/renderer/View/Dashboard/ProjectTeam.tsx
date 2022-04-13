import React, { useState } from 'react';
import {
  Container,
  Header,
  ProjectIcon,
  Row,
  Col,
  H1,
  H2,
  InputP,
  InputSelect,
  Text
} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { COLORS, size } from 'renderer/AppConstants';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import Popup from '../CreateProjectForm/Popup';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Icon from 'react-web-vector-icons';
import {
  GetDocument,
  SaveDocument,
} from 'renderer/Store/Actions/ProjectDocument.action';
import Api from 'renderer/Api/auth.api';
import { Notification } from 'renderer/Util/Notification/Notify';
import Tooltip from '@mui/material/Tooltip';
import {
  Label,
  Input,
  SelectRole,
  TabPanel,
  Tab,
  TabsList,
  TabsUnstyled,
  Row as RowMui,
} from 'renderer/Components/muiStyledComponent';

import axios from 'axios';

// import { ipcRenderer } from 'electron';

import FileViewer from 'react-file-viewer';
import { ControlPointDuplicateRounded } from '@mui/icons-material';
import { get } from 'http';
import { set } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';

const defaultImage =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
  history: RouteComponentProps['history'];
}

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  value:number;
  label:string;
  color:string;
  Fixed: boolean,
  isDisabled: boolean
};
const MemberSelect = (item: any) => ({
  value: item.id,
  uid: item.id,
  label: item.name,
  color: '#aeeeee',
  isFixed: true,
  isDisabled: false,
  role: item.role,
  email: item.email,
});
export default function ProjectTeam({ history, sideBar }: Props) {
  // data required in header
  const projects = useSelector(({ Project }: any) =>
    Project?.data?.projects ? Project?.data?.projects : []
  );

  const user = useSelector(({ auth }: any) => auth.user);
  const selectedProject = useSelector(
    ({ SelectedProject }: any) => SelectedProject
  );
  const [team, setTeam] = useState<TeamMember[]>();
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch = useDispatch();
  const [dataModel, setDataModel] = React.useState<documentFormAttributeType>(
    documentFormAttribute
  );
  const [TabV, setTabV] = React.useState(0);
  const [requestType,setRequestType]=React.useState('');




  const employee = useSelector(({ Members }: any) =>
    Members.data.map((item: any) => MemberSelect(item))
  );
  const [Members, setMembers] = React.useState<any>();

  const GetProjectteam = async () => {
    let res= await Api.GetProjectteam(Number(selectedProject?.pid), user?.accessToken)
    .catch((err: any) => {
      if(err.response?.status === 401){
        localStorage.removeItem('user');
        // history.push('/login');
      }
    });

    if (res?.status == 200) {
      setTeam(res.data);
      // //console.log(employee);
      let team = res.data;
      let addTeam = employee.filter((item: any) =>
        !team.find((item2: any) => item2.uid == item.uid)
      );
      //console.log("check it now",res.data);
      setMembers(addTeam.length > 0 ? addTeam : []);
      return res.data;
    }
  }

  React.useEffect(() => {
     GetProjectteam();
    return () => {
    setTeam([]);
    }
  },[]);



  const handleDelete = (sid: number) => {
    debugger;
    Api.DeleteSection(sid, user?.accessToken)
      .then((res) => {
        if (res.status === 200) {
          Notification('Sucess', 'Section Deleted Successfully', 'success');
        } else {
          Notification('Error', 'Can not deleted', 'danger');
        }
        dispatch(GetDocument(selectedProject?.pid, user?.accessToken));
      })
      .catch((err) => {
        Notification('Error', 'Can not deleted', 'danger');
      });

  };
  React.useEffect(() => {
    if (selectedProject?.pid) {
      dispatch(GetDocument(selectedProject.pid, user?.accessToken));
    }
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
            <H2 style={{ color: COLORS.primary }}>Project Team</H2>
            <Row style={{ alignItems: 'center' }}>
              <H1>{selectedProject?.projectTitle}</H1>
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
      {/* Header End */}

      <Row>
        <Button
          onClick={() => {setRequestType("");setTabV(0);setIsOpen(true)}}
          style={{
            fontSize: 12,
            margin: 10,
            color: COLORS.white,
            padding: 5,
            backgroundColor: COLORS.primary,
            textTransform: 'unset',
          }}
        >
          Add Project Team
        </Button>
      </Row>

     <Col>
     <Row
      style={{
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: COLORS.borderColor,
        height: 40,

        padding: 10,
        fontWeight: '600',
        justifyContent: "space-between",
        alignItems: 'center',
      }}
    >
      <Text style={{flex:1.5,display:'flex'}}>Profile Picture</Text>
      <Text style={{flex:1.5,display:'flex'}}>Name</Text>
      <Text style={{flex:1.5,display:'flex'}}>Email</Text>
      <Text style={{flex:1.5,display:'flex',}}>Role</Text>
      <Text style={{flex:1.5,display:'flex',justifyContent:'center'}}>Edit</Text>
      <Text style={{flex:1.5,display:'flex',justifyContent:'center'}}>Delete</Text>
     </Row>
     {team?.map((item: any) => (
        <Item item={item} setRequestType={setRequestType} GetProjectteam={GetProjectteam} setDataModel={setDataModel} setTabV={setTabV} setIsOpen={setIsOpen} dataModel={dataModel} />
     ))}
     </Col>

      <AddProjectTeamFrom
        projectId={selectedProject?.pid}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        Members={Members}
        GetProjectteam={GetProjectteam}
        TabV={TabV}
        setTabV={setTabV}
        dataModel={dataModel}
        setDataModel={setDataModel}
        requestType={requestType}
      />
    </Container>
  );
}

type itemType = {
  item: TeamMember;
  index?: number;
  openDropDown?: number;
  GetProjectteam?: () => void;
  setIsOpen:any;
  setDataModel:any;
  setTabV:any;
  dataModel:documentFormAttributeType,
  setRequestType:any
};

const Item = ({item,GetProjectteam,setIsOpen,setDataModel,setTabV,dataModel,setRequestType}: itemType) => {

  const user = useSelector(({ auth }: any) => auth.user);
  const dispatch = useDispatch();
  const selectedProject = useSelector(({ SelectedProject }: any) => SelectedProject);



  const handleEdit=()=>{
    setDataModel({...dataModel,team:[MemberSelect(item)]});
    setIsOpen(true);
    setTabV(1);
    setRequestType("update")
  }

  const RemoveTeamMember = () => {
    Api.RemoveTeamMember(item?.id, user?.accessToken).then((res) => {
      if (res.status === 200) {
        GetProjectteam!=undefined&&GetProjectteam();
        Notification('Sucess', 'Deleted Successfully', 'success');
      } else {
        Notification('Error', 'Can not deleted', 'danger');
      }
    }).catch((err) => {
      Notification('Error', 'Can not deleted'+item?.id, 'danger');
    })
  };

  return (
    <Row
      className={
        'animate__animated animate__fadeInRight'
      }
      style={{
        height: 40,
        padding: 10,
        paddingLeft: 20,
        fontWeight: '300',
        justifyContent: "space-between",
        alignItems: 'center',
      }}
    >

        <Tooltip title="Profile Image">
          <div style={{flex:1.5}}>
          <Avatar sx={{height:30,width:30}}  src={item.avatar} sizes={"20px"} />
          </div>

      </Tooltip>
      <Tooltip title="Name">
        <Text style={{flex:1.5,display:'flex',}}>{item.name}</Text>
      </Tooltip>
      <Tooltip title="Email">
      <Text style={{flex:1.5,display:'flex',}}>{item.email}</Text>
      </Tooltip>
      <Tooltip title="Role">
      <Text style={{flex:1.5,display:'flex',}}>{item.role}</Text>
      </Tooltip>


      <Tooltip title="ChaneROle">
        <Button style={{flex:1.5,display:'flex',}} onClick={handleEdit} >
          <Icon name="edit" font="Entypo" color={COLORS.blue} size={18} />
        </Button>
      </Tooltip>
      <Tooltip title="Delete Document">
        <Button style={{flex:1.5,display:'flex'}} onClick={RemoveTeamMember}>
          <Icon name="delete" font="AntDesign" color={COLORS.Rose} size={18} />
        </Button>
      </Tooltip>
    </Row>
  );
};

interface uploadcomprops {
  isOpen: boolean;
  setIsOpen: any;

  projectId: number;
  Members?:any,
  GetProjectteam: () => void,
  TabV: number;
  setTabV: any;
  dataModel: any;
  setDataModel: any;
  requestType?:string;
}
const documentFormAttribute = {
  team: [],
};
type documentFormAttributeType = {
  team: any;
};

const AddProjectTeamFrom = ({
  isOpen,
  setIsOpen,
  projectId,
  Members,
  GetProjectteam,
  TabV,
  setTabV,
  dataModel,
  setDataModel,
  requestType
}: uploadcomprops) => {
  const user = useSelector(({ auth }: any) => auth.user);
  // const dispatch = useDispatch();


  const togglePopup = () => {
    setDataModel(documentFormAttribute);
    setIsOpen(!isOpen);
  };


  const animatedComponents = makeAnimated();
  const [addNewRole, setAddNewRole] = useState(-1);
  const [newRole, setNewRole] = useState<any>([]);
  const HandleRole = (event: any, index: any) => {
    if (event.target.value == 'Add New') {
      setAddNewRole(index);
    } else {
      setDataModel({
        ...dataModel,
        team: dataModel.team.map((item: any, i: any) =>
          i == index ? { ...item, role: event.target.value } : item
        ),
      });
    }
  };

  const SubmitDocument = async () => {
    if (dataModel.team.length == 0) {
      Notification('error', 'Please select atleast one member', 'danger');
      return;
    }
    //console.log(dataModel.team);

    if(requestType=="")
   {
    let da=dataModel.team.map((item: any) => ({
      id:item.value,
      email:item.email,
      name:item.name,
      role:item.role,
    }))
    Api.AddTeamMember(projectId,da, user?.accessToken).then((res) => {
      if (res.status === 200) {
        GetProjectteam();
        setIsOpen(false);
        Notification('Sucess', 'Member Added TO Team Successfully', 'success');
        setDataModel(documentFormAttribute);
        setTabV(0);
      } else {
        Notification('Error', 'Can not added', 'warning');
      }
    }).catch((err) => {
      //console.log(err);
      Notification('Error', 'Can not added', 'danger');
    });}
    else if(requestType=="update")
    {
      debugger
      let da={
        id:dataModel.team[0].value,
        role:dataModel.team[0].role,
      }
      Api.UpdateTeamMember(dataModel.team[0].value,da,user?.accessToken).then((res) => {
        if (res.status === 200) {
          GetProjectteam();
          setIsOpen(false);
          Notification('Sucess', 'Team member updated Successfully', 'success');
          setDataModel(documentFormAttribute);
          setTabV(0);

        } else {
          Notification('Error', 'Can not updated', 'warning');
        }
      }).catch(err=>{
        //console.log(err);
        Notification('Error', 'Can not updated', 'danger');
      })
    }


  };
  const handleNext = () => {
    if (dataModel.team.length == 0) {
      Notification('error', 'Please select atleast one member', 'danger');
      return;
    }
    setTabV(TabV+1);
  };

  return (
    <>
      {isOpen && (
        <Popup
          height={'auto'}
          handleClose={togglePopup}
          content={
            <>
              <Box
                style={{
                  display: 'flex',
                  color: COLORS.blue1['500'],
                  fontSize: 20,
                  marginLeft: 8,
                  marginBottom: 10,
                }}
              >
                Project Team
              </Box>
              <TabsUnstyled value={TabV} defaultValue={0}>
                <TabsList>
                  <Tab>Select Members</Tab>
                  <Tab>Assign Roles</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <form>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        placeholder="share With"
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            backgroundColor: 'white',
                            color: 'black',
                            borderColor: 'white',
                            marginTop: 10,
                            zIndex: 100,
                          }),
                        }}
                        isMulti
                        defaultValue={dataModel.team}
                        options={Members}
                        onChange={(value: any) => {
                          setDataModel({ ...dataModel, team: value });
                        }}
                      />
                    </div>
                    <div
                      className="View-Profile-Button"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}
                    >
                      <Button
                        onClick={handleNext}
                        style={{
                          padding: 20,
                          fontSize: 16,
                          textTransform: 'unset',
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </TabPanel>
                <TabPanel value={1}>
                  <Box
                    style={{
                      maxHeight: 400,
                      overflow: 'hidden',
                      overflowY: 'scroll',
                      padding: 20,
                    }}
                  >
                    <RowMui>
                      <RowMui style={{ width: 100 }}>
                        <Label style={{ fontWeight: 'bold' }}>Id</Label>
                        <Label style={{ fontWeight: 'bold' }}>Name</Label>
                      </RowMui>
                      <Label style={{ fontWeight: 'bold', right: 40 }}>
                        Role
                      </Label>
                    </RowMui>
                    {dataModel.team.map((item: any, index: number) => {
                      return (
                        <RowMui>
                          <RowMui style={{ width: 100 }}>
                            <Label>{item.value}</Label>
                            <Label>{item.label}</Label>
                          </RowMui>
                          {addNewRole == index ? (
                            <Input
                              value={item?.role || ''}
                              onChange={(event) => {
                                HandleRole(event, index);
                              }}
                              onBlur={(event) => {
                                setNewRole(
                                  [event.target.value].concat(newRole)
                                );
                                setAddNewRole(-1);
                              }}
                            />
                          ) : (
                            <SelectRole
                              style={{}}
                              value={item?.role || ''}
                              onChange={(event) => HandleRole(event, index)}
                            >
                              <option value="">Select Role</option>
                              <option value="Scrum Master">Scrum Master</option>
                              <option value="Product Owner">
                                Product Owner
                              </option>
                              <option value="Developer">Developer</option>
                              <option value="Tester">Tester</option>
                              <option value="Designer">Designer</option>
                              <option value="Project Manager">
                                Project Manager
                              </option>
                              <option value="Business Analyst">
                                Business Analyst
                              </option>
                              <option value="Requirement Engineer">
                                Requirement Engineer
                              </option>
                              {newRole?.map((item: any, index: any) => (
                                <option value={item}>{item}</option>
                              ))}
                              <option value="Add New">Add New</option>
                            </SelectRole>
                          )}
                        </RowMui>
                      );
                    })}
                  </Box>
                  <div
                    className="View-Profile-Button"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      textTransform: 'unset',
                    }}
                  >
                    {/* <button>Submit</button> */}
                    <Button
                      style={{
                        padding: 20,
                        fontSize: 16,
                        textTransform: 'unset',
                      }}
                      onClick={() => {
                        if(requestType=="")
                        setTabV(0)
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      style={{
                        padding: 20,
                        fontSize: 16,
                        textTransform: 'unset',
                      }}
                      title=""
                      onClick={SubmitDocument}
                    >
                     {requestType==""?"Add":"Update"}
                    </Button>
                  </div>
                </TabPanel>
              </TabsUnstyled>
            </>
          }
        />
      )}
    </>
  );
};
