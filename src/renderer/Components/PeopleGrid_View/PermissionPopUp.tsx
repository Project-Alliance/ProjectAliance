import React, { useState } from 'react';
import Popup from 'renderer/View/CreateProjectForm/Popup';
import { projectGoalModel } from '../GoalModel';
import { useDispatch, useSelector } from 'react-redux';
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

const PermissionPopUp = ({ isOpen, setIsOpen }: any) => {
  const MemberSelect = (item: any) => ({
    value: item.id,
    label: item.name,
    color: '#aeeeee',
    isFixed: true,
    isDisabled: false,
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [TabV, setTabV] = useState(0);
  const user = useSelector(({ auth }: any) => auth.user);

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
    console.log(event.target.value);
    setDataModel({ ...dataModel, startDate: event.target.value });
  };
  const onEndDateChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, endDate: event.target.value });
  };

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
  };

  const handleSubmit = () => {
    if (!isValid()) {
      return;
    }
    const dataa = {
      GoalName: dataModel.GoalName,
      GoalDescription: dataModel.GoalDescription,
      startDate: dataModel.startDate,
      endDate: dataModel.endDate,
      companyName: user.company,
    };

    const url = 'http://192.168.43.107:5005/api/Goals/Create';
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
          Notification('Error', res.data.message, 'danger');
        }
      })
      .catch((err) => {
        debugger;
        if (err?.message == 'Network Error')
          Notification('Error', 'Network Error', 'danger');
        else Notification('Error', err?.response?.data?.message, 'danger');
      });
  };

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
                Permission Management of User
              </Box>
              <TabsUnstyled value={TabV} defaultValue={0} className="Scrollbar">
                <TabsList>
                  <Tab>Project Permissions</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <form>
                    <Box
                      style={{
                        display: 'flex',
                        color: blue['500'],
                        fontSize: 18,
                        marginLeft: 20,
                        marginBottom: 10,
                      }}
                    >
                      Manage Memebers
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-Around',
                      }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          color: blue['500'],
                          fontSize: 16,
                          marginLeft: 12,
                          marginBottom: 10,
                        }}
                      >
                        Read
                      </Box>
                      <input
                        type="checkbox"
                        id="topping"
                        name="topping"
                        value="Paneer"
                        style={{ marginTop: 6, color: blue['500'] }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-Around',
                      }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          color: blue['500'],
                          fontSize: 16,
                          marginLeft: 8,
                          marginBottom: 10,
                        }}
                      >
                        Create
                      </Box>
                      <input
                        type="checkbox"
                        id="topping"
                        name="topping"
                        value="Paneer"
                        style={{ marginTop: 6, color: blue['500'] }}
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-Around',
                      }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          color: blue['500'],
                          fontSize: 16,
                          marginLeft: 11,
                          marginBottom: 10,
                        }}
                      >
                        Delete
                      </Box>
                      <input
                        type="checkbox"
                        id="topping"
                        name="topping"
                        value="Paneer"
                        style={{ marginTop: 6, color: blue['500'] }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-Around',
                      }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          color: blue['500'],
                          fontSize: 16,
                          marginLeft: 10,
                          marginBottom: 10,
                        }}
                      >
                        Update
                      </Box>
                      <input
                        type="checkbox"
                        id="topping"
                        name="topping"
                        value="Paneer"
                        style={{ marginTop: 6, color: blue['500'] }}
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
};

export default PermissionPopUp;
