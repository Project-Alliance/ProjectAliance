
import PropTypes from "prop-types"
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {Avatar,Box,Button} from '@mui/material';

import { Notification } from 'renderer/Util/Notification/Notify';
import Api from 'renderer/Api/auth.api';
import Popup from 'renderer/View/CreateProjectForm/Popup';
import { TestCaseData } from "./DataModel";
import { COLORS } from "renderer/AppConstants";
import Icon from "react-web-vector-icons";



const AddTestCases = ({ isOpen, setIsOpen,updateData,testPlanId }: any) => {
  const togglePopup = () => {
    setDataModel(TestCaseData);
    setIsOpen(!isOpen);
  };

  const [dataModel, setDataModel] = React.useState(TestCaseData);
  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, Name: event.target.value });
  };
  const onCategoryNameChange = (event: any) => {
    setDataModel({ ...dataModel, categoryName: event.target.value });
  };
  const onCategoryType = (event: any) => {
    setDataModel({ ...dataModel, categoryType: event.target.value });
  };
  const  onTestTypeChanges= (event: any) => {
    setDataModel({ ...dataModel, testType: event.target.value });
  };


  const user = useSelector(({ auth }: any) => auth?.user);


  const CreateModule=()=>{
    console.log(dataModel)
    if(dataModel.Name.length==0){
      Notification('Error','Please enter Module Name',"danger");
      return;
    }
    else if(dataModel.categoryName.length==0){
      Notification('Error','Please enter Category Name',"danger");
      return;
    }
    else if(dataModel.categoryType.length==0){
      Notification('Error','Please enter Category Type',"danger");
      return;
    }
    else if(dataModel.testType.length==0){
      Notification('Error','Please enter Test Type',"danger");
      return;
    }

    Api.CreateTestCases(testPlanId,dataModel,user?.accessToken).then((res:any)=>{

      if(res.status==200){

        setDataModel(TestCaseData);
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
                    onChange={onCategoryNameChange}
                    value={dataModel.categoryName}
                    type="text"
                    placeholder="Test Category name"
                    name="CategoryName"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onCategoryType}
                    value={dataModel.categoryType}
                    type="text"
                    placeholder="Test Category Type"
                    name="CategoryType"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onTestTypeChanges}
                    value={dataModel.testType}
                    type="text"
                    placeholder="Test  TYpe"
                    name="TestType"
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
                    Create Test Case
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

AddTestCases.propTypes = {
  testPlanId: PropTypes.any,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  updateData: PropTypes.func
}

export default AddTestCases
