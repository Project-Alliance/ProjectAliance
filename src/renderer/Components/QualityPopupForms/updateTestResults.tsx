
import PropTypes from "prop-types"
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {Avatar,Box,Button} from '@mui/material';

import { Notification } from 'renderer/Util/Notification/Notify';
import Api from 'renderer/Api/auth.api';
import Popup from 'renderer/View/CreateProjectForm/Popup';
import { TestCaseResult } from "./DataModel";
import { COLORS } from "renderer/AppConstants";
import Icon from "react-web-vector-icons";



const AddTestCasesResult = ({ isOpen, setIsOpen,updateData,testCaseId }: any) => {
  const togglePopup = () => {
    setDataModel(TestCaseResult);
    setIsOpen(!isOpen);
  };

  const [dataModel, setDataModel] = React.useState(TestCaseResult);
  const onDescriptionChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, Description: event.target.value });
  };
  const onUrlNameChange = (event: any) => {
    setDataModel({ ...dataModel, url: event.target.value });
  };
  const onExpectedOutcomeFileType = (event: any) => {
    setDataModel({ ...dataModel, ExpectedOutcomeFile: event.target.files[0] });
  };
  const  onTestOutComeFileChanges= (event: any) => {
    setDataModel({ ...dataModel, testOutComeFile: event.target.files[0] });
  };


  const user = useSelector(({ auth }: any) => auth?.user);


  const CreateModule=()=>{
    console.log(dataModel)
    if(dataModel.Description.length==0){
      Notification('Error','Please enter Description',"danger");
      return;
    }
    else if(dataModel.url.length==0){
      Notification('Error','Please enter url',"danger");
      return;
    }
    else if(dataModel.ExpectedOutcomeFile==""){
      Notification('Error','Please enter Category Type',"danger");
      return;
    }
    else if(dataModel.testOutComeFile==""){
      Notification('Error','Please enter Test Type',"danger");
      return;
    }
    var data = new FormData();
data.append('Description', dataModel.Description);
data.append('url', dataModel.url);
data.append('ExpectedOutcomeFile', dataModel.ExpectedOutcomeFile);

data.append('testOutComeFile', dataModel.testOutComeFile);


    Api.CreateTestResult(testCaseId,data,user?.accessToken).then((res:any)=>{

      if(res.status==200){

        setDataModel(TestCaseResult);
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
                Add Test Case Result
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
                    onChange={onDescriptionChangeHandle}
                    value={dataModel.Description}
                    type="text"
                    placeholder="Description"
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
                    onChange={onUrlNameChange}
                    value={dataModel.url}
                    type="text"
                    placeholder="Design Url"
                    name="Design Url"
                  />
                  <input
                    className="form-control"
                    style={{ marginTop: 10, fontSize: 12 }}
                    onChange={onExpectedOutcomeFileType}

                    type="file"
                    placeholder="Expected File Outcome"
                    name="ExpectedOutComeFile"
                  />
                  <input
                    className="form-control"
                    style={{ marginTop: 10, fontSize: 12 }}
                    onChange={onTestOutComeFileChanges}
                    type="file"
                    placeholder="Test out Come File"
                    name="testOutComeFile"
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

AddTestCasesResult.propTypes = {
  isOpen: PropTypes.any,
  setIsOpen: PropTypes.func,
  testCaseId: PropTypes.any,
  updateData: PropTypes.func
}



export default AddTestCasesResult
