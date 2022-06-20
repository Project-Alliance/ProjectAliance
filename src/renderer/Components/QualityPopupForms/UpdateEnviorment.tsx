
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
import { EnviormentData } from "./DataModel";
import { COLORS } from "renderer/AppConstants";
import Icon from "react-web-vector-icons";

interface Props{
  envId:number;
  isOpen:boolean;
  setIsOpen:any;
  envData:typeof EnviormentData;
  updateData:any;

}

const AddEnviorment = ({ envId,isOpen, setIsOpen,updateData ,envData = EnviormentData }: Props) => {
  const togglePopup = () => {
    setDataModel(EnviormentData);
    setIsOpen(!isOpen);
  };
  // alert(requirementId)
  const [dataModel, setDataModel] = React.useState(envData);
  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, name: event.target.value });
  };
  const onDescriptionChange = (event: any) => {
    setDataModel({ ...dataModel, description: event.target.value });
  };

  const onSummeryChange = (event: any) => {
    setDataModel({ ...dataModel, summary: event.target.value });
  };

  const onEnviormentTypeChange = (event: any) => {
    setDataModel({ ...dataModel, TestType: event.target.value });
  };
  const user = useSelector(({ auth }: any) => auth?.user);


  const CreateModule=()=>{
    if(dataModel.name.length==0){
      Notification('Error','Please enter Module Name',"danger");
      return;
    }
    else if(dataModel.description.length==0){
      Notification('Error','Please enter Status',"danger");
      return;
    }else if(dataModel?.TestType?.length==0){
      Notification('Error','Please enter Status',"danger");
      return;
    }else if(dataModel?.summary?.length==0){
      Notification('Error','Please enter Status',"danger");
      return;
    }
    let data=dataModel;


    Api.UpdateEnviorment(envId,data,user?.accessToken).then((res:any)=>{
      if(res.status==200){
        setDataModel(EnviormentData);
        setIsOpen(false);
        updateData()
        Notification('Success','Envioroment Updated Successfully',"success");
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
                Update Enviorment
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
                    placeholder="Enviorment Name"
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
                    value={dataModel.description}
                    type="text"
                    placeholder="Enviorement Description"
                    name="description"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onSummeryChange}
                    value={dataModel.summary}
                    type="text"
                    placeholder="summary"
                    name="summary"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onEnviormentTypeChange}
                    value={dataModel.TestType}
                    type="text"
                    placeholder="Enviorment Type"
                    name="TestType"
                  />

                  <table>
                    <thead>
                      <tr>
                        <th>Lab Resource Name</th>
                        <th>Lab Resource Type</th>
                        <th>
                          <Button onClick={()=>{
                            let resourceArray=dataModel.res;
                            resourceArray.push({
                              "name":"",
                              "value":""
                          })
                          setDataModel({...dataModel,res:resourceArray})
                          }}>
                            <Icon name="plus" font="AntDesign" size={25} color={COLORS.white} />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataModel.res.map((item:any,index:number)=>(
                        <tr>
                          <td>
                          <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={({target}:any)=>{
                      let array = dataModel.res;
                      array[index].name=target.value;
                      setDataModel({...dataModel,res:array})
                    }}
                    value={dataModel.res[index].name}
                    type="text"
                    placeholder="Enviorment Name"
                    name="EnvName"
                  />
                          </td>
                          <td>

                          <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={({target}:any)=>{
                      let array = dataModel.res;
                      array[index].value=target.value;
                      setDataModel({...dataModel,res:array})
                    }}
                    value={dataModel.res[index].value}
                    type="text"
                    placeholder="Enviorment Type"
                    name="EnvType"
                  />
                          </td>
                          <td>
                          <Button onClick={()=>{
                            let resourceArray=dataModel.res.filter((_,i)=>i!=index)

                          setDataModel({...dataModel,res:resourceArray})
                          }}>
                            <Icon name="delete" font="AntDesign" size={25} color={COLORS.black} />
                          </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>



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
                    Update Enviorment
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

AddEnviorment.propTypes = {
  envData: PropTypes.any,
  envId: PropTypes.any,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  updateData: PropTypes.func
}

export default AddEnviorment
