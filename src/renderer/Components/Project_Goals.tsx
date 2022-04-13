// import { flexbox, maxHeight } from '@mui/system';
import React, { useState } from 'react';
// import InputButton from 'renderer/Components/InputButton';
import Popup from '../View/CreateProjectForm/Popup';
import {projectGoalModel} from './GoalModel';
import {useSelector,useDispatch} from "react-redux";

// import Api from "renderer/Api/auth.api";
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
import { header } from './layout/styled';
import { GetGoals } from 'renderer/Store/Actions/Project.Goals';

interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const rolesForSelection = [];

const animatedComponents = makeAnimated();
function Project_Goals({ isOpen, setIsOpen }: any) {
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

  const [dataModel, setDataModel] = useState(projectGoalModel);
  const onTitileChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, GoalName: event.target.value });
  };
  const onDescriptionChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, GoalDescription: event.target.value });
  };
  const onStartDateChangeHandle = (event: any) => {
    //console.log(event.target.value);
    setDataModel({...dataModel,"startDate":event.target.value});
  }
  const onEndDateChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"endDate":event.target.value});
  }


  const isValid = () => {
    if (dataModel.GoalName.length == 0) {
      Notification('Validation Error', 'Name Is required', 'danger');
      return false;
    } else if (dataModel.GoalDescription.length == 0) {
      Notification('Validation Error', 'Describe About your project', 'danger');
      false;
    } else if (dataModel.endDate.length == 0) {
      Notification('Validation Error', 'Goals Due Date is required', 'danger');
      return false;
    } else if (dataModel.startDate.length == 0) {
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
    const dataa = {
      GoalName: dataModel.GoalName,
      GoalDescription: dataModel.GoalDescription,
      startDate: dataModel.startDate,
      endDate: dataModel.endDate,
      companyName: user.company,
    };



    const url = 'http://localhost:5000/api/Goals/Create';
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.accessToken,
    };
    axios
      .post(url, dataa, { headers: header })
      .then((res) => {
        debugger;
        if (res.status == 200) {
          Notification('Crearted', res.data.message, 'success');

        togglePopup();
        dispatch(GetGoals(user.company, user.accessToken));
        setDataModel({ ...projectGoalModel });
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
                Add A Projeat Goals
              </Box>
              <TabsUnstyled value={TabV} defaultValue={0} className="Scrollbar">
                <TabsList>
                  <Tab>Project Goals</Tab>
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
                        value={dataModel.GoalName}
                        type="text"
                        placeholder="Enter a Goal Name"
                        name="GoalName"
                      />
                      <textarea
                        className="form-control"
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          maxHeight: 120,
                          minWidth: 80,
                          fontSize: 12,
                        }}
                        onChange={onDescriptionChangeHandle}
                        value={dataModel.GoalDescription}
                        placeholder="Enter Goals Description"
                        name="GoalDescription"
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
                        value={dataModel.startDate}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="Start Date"
                        name="startDate"
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
                        min={dataModel.startDate}
                        value={dataModel.endDate}
                        type="text"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="End Date"
                        name="endDate"
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
                          handleSubmit();
                        }}
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

export default Project_Goals;
