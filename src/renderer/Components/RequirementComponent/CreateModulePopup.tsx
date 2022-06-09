
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
import { ModuleData } from "./DataModel";
import { COLORS } from "renderer/AppConstants";



const CreateProjectPopup = ({ projectId,isOpen, setIsOpen }: any) => {
  const togglePopup = () => {
    setDataModel(ModuleData);
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
  const [dataModel, setDataModel] = React.useState(ModuleData);
  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, name: event.target.value });
  };
  const onStatusChange = (event: any) => {
    setDataModel({ ...dataModel, status: event.target.value });
  };

  const user = useSelector(({ auth }: any) => auth?.user);


  const CreateModule=()=>{
    if(dataModel.name.length==0){
      Notification('Error','Please enter Module Name',"danger");
      return;
    }
    else if(dataModel.status.length==0){
      Notification('Error','Please enter Status',"danger");
      return;
    }

    Api.createRequirementModule(projectId,dataModel,user?.accessToken).then((res:any)=>{
      debugger
      console.log("res",res)
      if(res.status==200){

        setDataModel(ModuleData);
        setIsOpen(false);
        Notification('Success','Module Created Successfully',"success");
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
                Create Module
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
                    Create Module
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

CreateProjectPopup.propTypes = {
  isOpen: PropTypes.bool,
  projectId: PropTypes.any,
  setIsOpen: PropTypes.func
}

export default CreateProjectPopup
