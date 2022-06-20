import PropTypes from "prop-types"
import { flexbox, maxHeight } from '@mui/system';
import React,{useState} from 'react';
import InputButton from 'renderer/Components/InputButton';
import Popup from './Popup';
import {updateprojectDataModel} from './DataModel';
import {useSelector,useDispatch} from "react-redux";
import Api from "renderer/Api/auth.api";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {Button,Box,} from '@mui/material';
import {Notification as Noti} from 'renderer/Util/Notification/Notify'
import {blue} from "renderer/AppConstants";
import {Label,Input,SelectRole,Row,Tab,TabPanel,TabsList,TabsUnstyled} from 'renderer/Components/muiStyledComponent';
import { getProjects } from 'renderer/Store/Actions/Project.action';
import { notify } from 'renderer/Store/ReduxToolkit/Notification';


interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;

}

const rolesForSelection=[]

const animatedComponents = makeAnimated();
interface projectDataModel{
  projectTitle:string;
  projectDescription:string;
  startDate:string;
  endDate:string;
  status:string;
  pid:number;
}
interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: projectDataModel;
  setSelectedProject: (data: any) => void;
}
function UpdateProject({isOpen,setIsOpen,data=updateprojectDataModel,setSelectedProject}:Props) {

  const dispatch=useDispatch();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const user = useSelector(({auth}:any)=>auth.user);


  const notification = useSelector(({notification}:notify)=>notification);

  const [dataModel,setDataModel] = useState(data);
  const onTitileChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"projectTitle":event.target.value});
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
  const onStatusChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"status":event.target.value});
  }

  const isValid=()=>{
    if(dataModel.projectTitle.length==0)
    {
      Noti("Validation Error","Name Is required","danger");
      return false;
    }
    else if(dataModel.projectDescription.length==0)
    {
      Noti("Validation Error","Describe About your project","danger");
      false;
    }else if(dataModel.endDate.length==0){
      Noti("Validation Error","Project Due Date is required","danger");
      return false;
    }
    else if(dataModel.startDate.length==0){
      Noti("Validation Error","Project start Date is required","danger");
      return false;
    }
    else if(dataModel.status.length==0){
      Noti("Validation Error","Project Status is required","danger");
      return false;
    }

     return true;
  }

  const handleSubmit=()=>{

    if(!isValid())
    {
      return;
    }
    const dataa = {
      ProjectTitle: dataModel.projectTitle,
      projectDescription: dataModel.projectDescription,
      status: dataModel.status,
      startDate: dataModel.startDate,
      endDate: dataModel.endDate,
    };

    // setDataModel({...dataModel,"company":user.company});
    Api.updateProject(dataModel.pid,dataa, user.accessToken)
      .then((res) => {
        if (res.status == 200) {
          Noti("Updated",res.data.message,"success");
          togglePopup();
          dispatch(getProjects(user.company,user.accessToken));
          setSelectedProject(null);
          setDataModel({ ...updateprojectDataModel });
          if(notification.onProjectCreated)
          {
            new Notification("Project Updated");
          }
        } else {
          Noti("Error",res.data.message,"danger");
        }
      })
      .catch((err) => {

        if(err?.message=="Network Error")
        Noti("Error","Network Error","danger");
        else
        Noti("Error",err?.response?.data?.message,"danger");

      });
  }
  return (
    <>
      {isOpen && (
        <Popup
          handleClose={togglePopup}
          height={'auto'}
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
                Update Project
              </Box>
              <TabsUnstyled value={0} defaultValue={0}>
                <TabsList>
                  <Tab>Update Project Info</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <form>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <input
                        className="form-control"
                        style={{ marginTop: 10, marginBottom: 10,height:30,fontSize:12 }}
                        onChange={onTitileChangeHandle}
                        value={dataModel.projectTitle}
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
                        value={dataModel.startDate.substring(0,10)}
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
                        value={dataModel.endDate.substring(0,10)}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date' )}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="End Date"
                        name="endDate"
                      />
                      <input
                        className="form-control"
                        style={{ marginTop: 10, marginBottom: 10,height:30,fontSize:12 }}
                        onChange={onStatusChangeHandle}
                        value={dataModel.status}
                        type="text"

                        placeholder="Project Status"
                        name="status"
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
                        onClick={handleSubmit}
                      >
                        Update
                      </Button>
                    </div>
                  </form>
                </TabPanel>

              </TabsUnstyled>
            </>
          }
        />
      )}
    </>
  );
}

UpdateProject.propTypes = {
  data: PropTypes.any,
  isOpen: PropTypes.any,
  setIsOpen: PropTypes.func
}

export default UpdateProject;
