import { flexbox, maxHeight } from '@mui/system';
import React,{useState} from 'react';
import InputButton from 'renderer/Components/InputButton';
import Popup from './Popup';
import {projectDataModel} from './DataModel';
import {useSelector} from "react-redux";
import Api from "renderer/Api/auth.api";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {Button,Box,} from '@mui/material';
import {Notification} from 'renderer/Util/Notification/Notify'
import {blue} from "renderer/AppConstants";
import {Label,Input,SelectRole,Row,Tab,TabPanel,TabsList,TabsUnstyled} from 'renderer/Components/muiStyledComponent';


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
    console.log(event.target.value);
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

  const isValid=()=>{
    if(dataModel.ProjectTitle.length==0)
    {
      Notification("Validation Error","Name Is required","danger");
      return false;
    }
    else if(dataModel.projectDescription.length==0)
    {
      Notification("Validation Error","Describe About your project","danger");
      false;
    }else if(dataModel.endDate.length==0){
      Notification("Validation Error","Project Due Date is required","danger");
      return false;
    }
    else if(dataModel.startDate.length==0){
      Notification("Validation Error","Project start Date is required","danger");
      return false;
    }
    else if(dataModel.team.length>0){
      let vlaid=true;
      dataModel.team.map((item:any,index:any)=>{
        if(!item?.role){
      Notification("Validation Error","PLease Assign Role to "+item.label,"danger");
      vlaid = false;
        }
      })
      return vlaid;
    }
     return true;
  }

  const handleSubmit=()=>{

    if(!isValid())
    {
      return;
    }
    const dataa = {
      ProjectTitle: dataModel.ProjectTitle,
      projectDescription: dataModel.projectDescription,
      status: 'On Track',
      company: user.company,
      startDate: dataModel.startDate,
      endDate: dataModel.endDate,
      team:dataModel.team
    };
    console.log(dataa)
    // setDataModel({...dataModel,"company":user.company});
    Api.CreateProject(dataa, user.accessToken)
      .then((res) => {
        if (res.data.status == 200) {
          Notification("Crearted",res.data.message,"success");
          togglePopup();
          setDataModel({ ...projectDataModel });
        } else {
          Notification("Error",res.data.message,"danger");
        }
      })
      .catch((err) => {
        debugger
        if(err?.message=="Network Error")
        Notification("Error","Network Error","danger");
        else
        Notification("Error",err?.response?.data?.message,"danger");

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
                        min={dataModel.startDate}
                        value={dataModel.endDate}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date' )}
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
                      onClick={({target}) => setTabV(0)}
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
