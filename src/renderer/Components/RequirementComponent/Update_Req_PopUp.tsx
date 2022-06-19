/* eslint-disable prefer-template */
/* eslint-disable promise/always-return */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */

import PropTypes from "prop-types"
import React from 'react';
import { Container,Header,ProjectIcon ,Row,Col,H1,H2,SCard,Text
,ChartBox
} from 'renderer/Components/layout';
import { useDispatch, useSelector } from 'react-redux';
import {Avatar,Box,Button} from '@mui/material';

import { Notification } from 'renderer/Util/Notification/Notify';
import Api from 'renderer/Api/auth.api';
import Popup from 'renderer/View/CreateProjectForm/Popup';
import { RequirementData } from "./DataModel";
import { COLORS } from "renderer/AppConstants";

interface Req {
  reqs: number,
  projectId: number,
  isOpen:any,
  setIsOpen: any ,
}


const UpdateReq_PopUp = ({ reqs, projectId, isOpen, setIsOpen }: Req) => {

  const togglePopup = () => {
    setDataModel(RequirementData);
    setIsOpen(!isOpen);
  };
  const MemberSelect = (item: any) => ({
    value: item.id,
    label: item.name,
    color: '#aeeeee',
    isFixed: true,
    isDisabled: false,
  });

  const Members = useSelector(({ Members }: any) =>
    Members.data.map((item: any) => MemberSelect(item))
  );
  const [dataModel, setDataModel] = React.useState(RequirementData);
  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, name: event.target.value });
  };
  const onStatusChange = (event: any) => {
    setDataModel({ ...dataModel, status: event.target.value });
  };
  const onReqDesChange = (event: any) => {
    setDataModel({ ...dataModel, requirementDescription: event.target.value });
  };
  const onReqTypeChange = (event: any) => {
    setDataModel({ ...dataModel, requirementType: event.target.value });
  };
  const onmoduleIdChange = (event: any) => {
    setDataModel({ ...dataModel, moduleId: event.target.value });
  };
  const onmodifiedByChange = (event: any) => {
    setDataModel({ ...dataModel, modifiedBy: event.target.value });
  };
  const onmodifeidOnChange = (event: any) => {
    setDataModel({ ...dataModel, modifeidOn: event.target.value });
  };
  const onfileOnChange = (event: any) => {
    setDataModel({ ...dataModel, file:event.target.files[0],fileName:event.target.files[0].name });
  };

  const user = useSelector(({ auth }: any) => auth?.user);


  const UpdateRequirement=(reqs:any,projectId:any)=>{
    debugger
    if(dataModel.name.length==0){
      Notification('Error','Please enter Module Name',"danger");
      return;
    }
    if(dataModel.status.length==0){
      Notification('Error','Please enter Status',"danger");
      return;
    }else if(dataModel.requirementDescription.length==0){
      Notification('Error','Please enter Correct Description',"danger");
      return;
    }else if(dataModel.requirementType.length==0){
      Notification('Error','Please enter Requirement Type',"danger");
      return;
    }
    // else if(dataModel.moduleId.length==0){
    //   Notification('Error','Please enter Module Id',"danger");
    //   return;
    // }else if(dataModel.modifiedBy.length==0){
    //   Notification('Error','Please enter Modified By',"danger");
    //   return;
    // }else if(dataModel.modifeidOn.length==0){
    //   Notification('Error','Please enter Modified On',"danger");
    //   return;
    // }
    else if(dataModel.file.length==0){
      Notification('Error','Please enter File',"danger");
      return;
    }

    var data = new FormData();
    data.append('name', dataModel.name);
    data.append('status', dataModel.status);
    data.append('requirementDescription', dataModel.requirementDescription);
    data.append('requirementType', dataModel.requirementType);

      data.append("file", dataModel.file);


    Api.updateRequirement( reqs,projectId , data , user?.accessToken ).then((res:any)=>{
      console.log("requirement for the specific module is here",res)
      if(res.status==200){

        setDataModel(RequirementData);
        setIsOpen(false);
        Notification('Success','Requirement Change Successfully',"success");
      }else{
        Notification('Error','Something went wrong',"danger");
      }
    }).catch((err:any)=>{
      console.log(JSON.stringify(err))
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
                Update Requirement
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
                    value={dataModel.name}
                    type="text"
                    placeholder="Module Name"
                    name="moduleName"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onStatusChange}
                    value={dataModel.status}
                    type="text"
                    placeholder="Module Status"
                    name="ModuleStatus"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onReqDesChange}
                    value={dataModel.requirementDescription}
                    type="text"
                    placeholder="Requirement Description"
                    name="requirementDescription"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onReqTypeChange}
                    value={dataModel.requirementType}
                    type="text"
                    placeholder="Requirement Type"
                    name="requirementType"
                  />
                  {/* <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onmoduleIdChange}
                    value={dataModel.moduleId}
                    type="text"
                    placeholder="Module Id"
                    name="moduleId"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onmodifiedByChange}
                    value={dataModel.modifiedBy}
                    type="text"
                    placeholder="Modified By"
                    name="modifiedBy"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onmodifeidOnChange}
                    value={dataModel.modifeidOn}
                    type="text"
                    placeholder="Modified On"
                    name="modifeidOn"
                  /> */}
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,

                      fontSize: 12,
                    }}
                    onChange={onfileOnChange}

                    type="file"
                    placeholder="File"
                    name="file"
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

                  onClick={()=>{ UpdateRequirement(reqs,projectId)}}
                    style={{
                      padding: 20,
                      fontSize: 16,
                      textTransform: 'unset',
                    }}
                  >
                    Update Requirement
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

UpdateReq_PopUp.propTypes = {
  isOpen: PropTypes.bool,
  projectId: PropTypes.any,
  reqs: PropTypes.any,
  setIsOpen: PropTypes.func
}

export default UpdateReq_PopUp;
