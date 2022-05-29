// import { flexbox, maxHeight } from '@mui/system';
import React, { useState } from 'react';
// import InputButton from 'renderer/Components/InputButton';
import Popup from '../../View/CreateProjectForm/Popup';

import { projectGoalModel } from '../GoalModel';
import { projectScheduleModel ,projectScheduleModelType} from './ScheduleModel';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Api from "renderer/Api/auth.api";
// import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import { Notification } from 'renderer/Util/Notification/Notify';
import { blue } from 'renderer/AppConstants';
import {
  Label,
  Input,
  SelectRole,
  Row,
  Tab,
  TabPanel,
  TabsList,
  TabsUnstyled,
} from 'renderer/Components/muiStyledComponent';
import Slider from '@mui/material/Slider';

function Project_Schdule({ isOpen, setIsOpen,ProjectId,getSchedule,update=false,DATA=projectScheduleModel }: any) {
  const MemberSelect = (item: any) => ({
    value: item.id,
    label: item.name,
    color: '#aeeeee',
    isFixed: true,
    isDisabled: false,
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [TabV,setTabV] = useState(0);
  const user = useSelector(({auth}:any)=>auth.user);

  const dispatch = useDispatch();
  // const Members = useSelector(({ Members }: any) => Members.data.map((item:any)=>MemberSelect(item)));

  const [dataModel, setDataModel] = useState<projectScheduleModelType>(DATA);
  const onTitileChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, name: event.target.value });
  };
  const onDependencyChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, dependencies: event.target.value });
  };
  const onStartDateChangeHandle = (event: any) => {
    console.log(event.target.value);
    setDataModel({...dataModel,start:event.target.value});
  }
  const onEndDateChangeHandle=(event:any)=>{
    setDataModel({...dataModel,end:event.target.value});
  }
  const handleProgressChange=(event:any)=>{
    setDataModel({...dataModel,"progress":event.target.value});
  }

  const isValid = () => {
    if (dataModel.name.length == 0) {
      Notification('Validation Error', 'Name Is required', 'danger');
      return false;
    } else if (dataModel.end.length == 0) {
      Notification('Validation Error', 'Due Date is required', 'danger');
      return false;
    } else if (dataModel.start.length == 0) {
      Notification(
        'Validation Error',
        'Goals start Date is required',
        'danger'
      );
      return false;
    }

     return true;
  }

  const handleSubmit=()=>{

    if(!isValid())
    {
      return;
    }
    const data = {
      "name" : dataModel.name,
   "ProjectId" :  ProjectId,
   "start":dataModel.start,
   "end" :  dataModel.end,
   "AssignTo": 1,
   "dependancies" :  dataModel.dependencies,
   "progress":dataModel.progress
    };

    if(update)
    {
      Api.updateSchedule(DATA.id,data,user?.accessToken)
      .then((res) => {

        if (res.status == 200) {
          Notification('Crearted', res.data.message, 'success');
          getSchedule();
        togglePopup();
        setDataModel({ ...projectScheduleModel });
      } else {
        Notification("Error",res.data.message,"danger");
      }
    })
    .catch((err) => {
      debugger
      if(err?.message=="Network Error")
      Notification("Error what","Network Error","danger");
      else
      Notification("Error here",JSON.stringify(err),"danger");

    });
    }
    else{
      Api.CreateSchedule(ProjectId,data,user?.accessToken)
      .then((res) => {
        debugger;
        if (res.status == 200) {
          Notification('Crearted', res.data.message, 'success');
          getSchedule();
        togglePopup();
        setDataModel({ ...projectScheduleModel });
      } else {
        Notification("Error",res.data.message,"danger");
      }
    })
    .catch((err) => {
      debugger
      if(err?.message=="Network Error")
      Notification("Error what","Network Error","danger");
      else
      Notification("Error here",JSON.stringify(err),"danger");

    });
    }

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
               {update?" Wanted to update Schedule?":" Wanted to Add Schedule?"}
              </Box>
              <TabsUnstyled value={TabV} defaultValue={0} className="Scrollbar">
                <TabsList>
                  <Tab>Project Schedule</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <form>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <input
                        className="form-control"
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          height: 30,
                          fontSize: 12,
                        }}
                        onChange={onTitileChangeHandle}
                        defaultValue={dataModel.name}
                        type="text"
                        placeholder="Enter a Task Name"
                        name="GoalName"
                      />
                      <input
                        className="form-control"
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          height: 30,
                          fontSize: 12,
                        }}
                        onChange={onStartDateChangeHandle}
                        defaultValue={dataModel.start}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="Start Date"
                        name="start"
                      />
                      <input
                        className="form-control"
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          height: 30,
                          fontSize: 12,
                        }}
                        onChange={onEndDateChangeHandle}
                        min={dataModel.start}
                        defaultValue={dataModel.end}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="End Date"
                        name="end"
                      />

                      <input
                        className="form-control"
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          height: 30,
                          fontSize: 12,
                        }}
                        onChange={onDependencyChangeHandle}
                        defaultValue={dataModel.dependencies}
                        type="text"
                        placeholder="Enter Dependency Task"
                        name="DependsOn"
                      />

                      <Slider
                        aria-label="Progress"
                        defaultValue={dataModel.progress}
                        valueLabelDisplay="auto"
                        step={1}
                        onChange={handleProgressChange}
                        marks
                        min={0}
                        max={100}
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
                        Save
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

export default Project_Schdule;