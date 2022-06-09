
import PropTypes from "prop-types"
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {Avatar,Box,Button} from '@mui/material';

import { Notification } from 'renderer/Util/Notification/Notify';
import Api from 'renderer/Api/auth.api';
import Popup from 'renderer/View/CreateProjectForm/Popup';
import { TestPlanData } from "./DataModel";
import { COLORS } from "renderer/AppConstants";
import Icon from "react-web-vector-icons";



const AddTestPlan = ({ isOpen, setIsOpen,updateData,envId }: any) => {
  const togglePopup = () => {
    setDataModel(TestPlanData);
    setIsOpen(!isOpen);
  };

  const [dataModel, setDataModel] = React.useState(TestPlanData);
  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, Name: event.target.value });
  };
  const onDescriptionChange = (event: any) => {
    setDataModel({ ...dataModel, Description: event.target.value });
  };


  const user = useSelector(({ auth }: any) => auth?.user);


  const CreateModule=()=>{
    console.log(dataModel)
    if(dataModel.Name.length==0){
      Notification('Error','Please enter Module Name',"danger");
      return;
    }
    else if(dataModel.Description.length==0){
      Notification('Error','Please enter Status',"danger");
      return;
    }

    Api.CreateTestPlan(envId,dataModel,user?.accessToken).then((res:any)=>{

      if(res.status==200){

        setDataModel(TestPlanData);
        setIsOpen(false);
        updateData()
        Notification('Success','Test Plan Added Successfully',"success");
      }else{
        Notification('Error','Something went wrong',"danger");
      }
    }).catch((err:any)=>{
      Notification('Error','Something went wrong   '+err,"danger");
    })

  }

  return (
    <>
      {isOpen && (
        <Popup
        height={"auto"}

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
                Add Test Plan
              </Box>

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
                    onChange={onNameChangeHandle}
                    value={dataModel.Name}
                    type="text"
                    placeholder="Test Plan Name"
                    name="Name"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onDescriptionChange}
                    value={dataModel.Description}
                    type="text"
                    placeholder="Test Plan Description"
                    name="description"
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

                  onClick={CreateModule}
                    style={{
                      padding: 20,
                      fontSize: 16,
                      textTransform: 'unset',
                    }}
                  >
                    Create Test Plan
                  </Button>
                </div>
              </form>
           </>
          }
        />
      )}
    </>
  );
};

AddTestPlan.propTypes = {
  envId: PropTypes.any,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  updateData: PropTypes.func
}

export default AddTestPlan
