import { flexbox, maxHeight } from '@mui/system';
import React,{useState} from 'react';
import InputButton from 'renderer/Components/InputButton';
import Popup from './Popup';
import {projectDataModel} from './DataModel';
import {useSelector} from "react-redux";
import Api from "renderer/Api/auth.api";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import {Button,Box,} from '@mui/material';

import { Store } from 'react-notifications-component'
const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 6px 8px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;


  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 12px;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  height:40px;
`;

const Row = styled('div')`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width:100%;
margin:5px;
`;
const Label = styled('label')`
font-size: 12px;
font-family: Inter,sans-serif;
font-weight: 500;
color: #000;

`;

const SelectRole = styled('select')`
width: 200px;
height: 20px;
border-radius: 5px;
font-size: 12px;
border: 1px solid ${blue[200]};
`;

const Input = styled('input')`
width: 200px;
height: 20px;
border-radius: 5px;
font-size: 12px;
border: 1px solid ${blue[200]};
`;

interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;

}

const rolesForSelection=[]

const animatedComponents = makeAnimated();
function AddProjectForm({isOpen,setIsOpen}:any) {


  const MemberSelect=(item:any)=>({
    value: item.id,
    label: item.name,
    color: "#aeeeee",
    isFixed: true,
    isDisabled: false
  })

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const [TabV,setTabV] = useState(0);
  const [addNewRole,setAddNewRole] = useState(-1);
  const [error,setError] = useState("");
  const [newRole,setNewRole]=useState<any>([])
  const [addRole,setAddRole]=useState<any>('')
  const user = useSelector(({auth}:any)=>auth.user);
  const Members = useSelector(({ Members }: any) => Members.data.map((item:any)=>MemberSelect(item)));

  const [dataModel,setDataModel] = useState(projectDataModel);
  const onTitileChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"ProjectTitle":event.target.value});
  }
  const onDescriptionChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"projectDescription":event.target.value});
  }
  const onStartDateChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"startDate":event.target.value});
  }
  const onEndDateChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"endDate":event.target.value});
  }
  const HandleRole=(event:any,index:any)=>{

    if(event.target.value=="Add New")
    {
      setAddNewRole(index)
    }
    else{
      setDataModel({...dataModel,"team":dataModel.team.map((item:any,i:any)=>i==index?{...item,role:event.target.value}:item)})
    }
  }

  const ErrorFunction=()=>{
    Store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }
  const isValid=()=>{

  }

  const handleSubmit=()=>{


    const dataa = {
      ProjectTitle: dataModel.ProjectTitle,
      projectDescription: dataModel.projectDescription,
      status: 'On Track',
      company: user.company,
      startDate: dataModel.startDate,
      endDate: dataModel.endDate,
      team:dataModel.team
    };
    // setDataModel({...dataModel,"company":user.company});
    Api.CreateProject(dataa, user.accessToken)
      .then((res) => {
        if (res.data.status == 200) {
          alert(res.data.message);
          togglePopup();
          setDataModel({ ...projectDataModel });
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        debugger

        ErrorFunction()

        alert(JSON.stringify(err.response));
      });
  }
  return (
    <>
      {isOpen && (
        <Popup
          handleClose={togglePopup}
          content={
            <>
              <Box
                style={{
                  display: 'flex',
                  color: blue['500'],
                  fontSize: 20,
                  marginLeft: 8,
                  marginBottom: 10,
                }}
              >
                Create New Project
              </Box>
              <TabsUnstyled value={TabV} defaultValue={0}>
                <TabsList>
                  <Tab>Project Info</Tab>
                  <Tab>Assign Roles</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <form>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <input
                        className="form-control"
                        style={{ marginTop: 10, marginBottom: 10,height:30,fontSize:12 }}
                        onChange={onTitileChangeHandle}
                        value={dataModel.ProjectTitle}
                        type="text"
                        placeholder="Project Title"
                        name="ProjectTitle"
                      />
                      <textarea
                        className="form-control"
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          maxHeight: 120,
                          minWidth: 80,
                          fontSize:12
                        }}
                        onChange={onDescriptionChangeHandle}
                        value={dataModel.projectDescription}
                        placeholder="Project Description"
                        name="projectDescription"
                      />
                      <input
                        className="form-control"
                        style={{ marginTop: 10, marginBottom: 10,height:30,fontSize:12 }}
                        onChange={onStartDateChangeHandle}
                        value={dataModel.startDate}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="Start Date"
                        name="startDate"
                      />
                      <input
                        className="form-control"
                        style={{ marginTop: 10, marginBottom: 10,height:30,fontSize:12 }}
                        onChange={onEndDateChangeHandle}
                        value={dataModel.endDate}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="End Date"
                        name="endDate"
                      />
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
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
                        style={{
                          padding: 20,
                          fontSize: 16,
                          textTransform: 'unset',
                        }}
                        onClick={() => {
                          if(dataModel.team.length>0)
                          {
                            setTabV(1)
                          }
                          else {
                            setError("Please Assign Team to your Project")
                          }
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
                    <Row>
                      <Row style={{ width: 100 }}>
                        <Label style={{fontWeight:"bold",}}>Id</Label>
                        <Label style={{fontWeight:"bold"}}>Name</Label>
                      </Row>
                      <Label style={{fontWeight:"bold",right:40}}>Role</Label>
                    </Row>
                    {dataModel.team.map((item: any,index:number) => {
                      return (
                        <Row>
                          <Row style={{ width: 100 }}>
                            <Label>{item.value}</Label>
                            <Label>{item.label}</Label>
                          </Row>
                          {addNewRole==index?
                          <Input
                          value={item?.role||""}

                          onChange={event=>{
                            debugger;
                            setAddRole(event.target.value)
                            HandleRole(event,index)}}
                            onBlur={(event)=>{
                              setNewRole([event.target.value].concat(newRole))
                              setAddNewRole(-1)
                            }}
                          />
                          :<SelectRole
                          style={{}}
                          value={item?.role||""} onChange={(event)=>HandleRole(event,index)}>
                          <option value="">Select Role</option>
                            <option value="Scrum Master">Scrum Master</option>
                            <option value="Product Owner">Product Owner</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Designer">Designer</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Business Analyst">Business Analyst</option>
                            <option value="Requirement Engineer">Requirement Engineer</option>
                            {newRole?.map((item:any,index:any)=><option value={item}>{item}</option>)}
                            <option value="Add New">Add New</option>
                          </SelectRole>}
                        </Row>
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
                      onClick={() => setTabV(0)}
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
                      onClick={handleSubmit}
                    >
                      Create Project
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
}

export default AddProjectForm;
