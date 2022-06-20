/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { Container,Header,ProjectIcon ,Row,Col,H1,H2,H5,SCard,Text,
InputP,InputReq
} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { COLORS } from 'renderer/AppConstants';
import { useDispatch, useSelector } from 'react-redux';
import {Avatar,Button} from '@mui/material';

import Api from 'renderer/Api/auth.api';
import CreateProjectPopup from 'renderer/Components/RequirementComponent/CreateModulePopup';
import CreateRequirementPopUp from 'renderer/Components/RequirementComponent/CreateRequirement_PopUp';
import Icon from 'react-web-vector-icons';
import { option3 } from './SideBarButtonsSetails'
import DropDownMenuSelect from 'renderer/Components/DropDownMenue';
import CustomComponent from 'renderer/Components/Comments/comment';
import IconCloseButton from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton";
import AddEnviorment from 'renderer/Components/QualityPopupForms/AddEnviorment';



const defaultImage = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';
interface Props {
  sideBar?: string;
  history: RouteComponentProps['history'];
}
export default function Requirements({ history, sideBar }: Props) {

  const [counter, setCounter] = useState(0);

// data required in header
  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);

  const user = useSelector(({ auth }: any) => auth?.user);
  const selectedProject = useSelector(({SelectedProject}: any) => SelectedProject);
  const [isOpen,setIsOpen] = useState(false);
  const [isOpenEnv,setIsOpenEnv] = useState(false);
  const [reqId1,setIsReqId1] = useState(0);

  const [isOpenR,setOpenR] = useState(false);
  const [requirement,setRequirement]=useState([]);
  const [reqModule,setReqModule] = useState([]);
  const [isDetail,setIsdetail]=useState(false)
  const [moduleId,setModuleId]=useState(0);
  const [projectId,setProjectId]=useState(0);
  const [reqId,setReqId]=useState(0);
  const [dataModel,setDataModel]=useState({name:"",status:""})


  const getRequirements=async ()=>{
   let req=await Api.getRequirementModule(selectedProject.pid,user.accessToken)
    .catch(err=>{
      console.log(err)
    })
    if(req.status==200){

    setRequirement(req?.data);
  }
  }


  //delete module api call
  const deleteModule = async (mid:number,projectId:number)=>{
    let req=await Api.deleteRequirementModule(mid,projectId,user.accessToken)
    .catch(err=>{
      console.log(err)
    })
    if(req?.data){
      console.log(req.data)
    getRequirements();}
  }


  const deleteReq= async (rid:number,projectId:number)=>{
    try{
      let req= await Api.deleteRequirement(rid,projectId,user.accessToken);
      if(req.status==200){

        let req=await Api.getRequirementModule(selectedProject.pid,user.accessToken)
        .catch(err=>{
          console.log(err)
        })
        if(req.status==200){

        setRequirement(req?.data);
        req.data.map((item:any)=>{
          debugger;

          if(item.id==moduleId){
            setReqModule(item.requirements)
          }
        })
      }
      }
    }catch(err){
      console.log(err);
    }
  }


  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, name: event.target.value });
  };
  const onStatusChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, status: event.target.value });
  };


  useEffect(() => {
    if(requirement.length===0)
    getRequirements();
  }, [requirement])


  return (
  <Container style={{overflowY:"scroll"}}>
    {/* Header Start  */}
    <CreateProjectPopup isOpen={isOpen} setIsOpen={setIsOpen} projectId={selectedProject.pid} getProjectModule={getRequirements } />

    {isOpenR&&moduleId&&<CreateRequirementPopUp isOpen={isOpenR} setIsOpen={setOpenR} projectId={selectedProject.pid} moduleId={moduleId}  getRequirements={getRequirements} />}

    <AddEnviorment
        isOpen={isOpenEnv}
        setIsOpen={setIsOpenEnv}
        projectId={selectedProject?.pid}
        updateData={()=>{}}
        requirementId={reqId1}
        isRequirementBased={true}
      />
    <Header style={{justifyContent:'space-between'}}>
      <Row>
      <ProjectIcon style={{borderRadius:10}}>
        <img style={{height:35,width:35}} src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase" />

      </ProjectIcon>
      <Col style={{marginLeft:5}}>
        <H2 style={{color:COLORS.primary}}>Project Requirement</H2>
        <Row style={{alignItems:'center'}}>
        <H1>{selectedProject?.projectTitle}</H1>
        </Row>
      </Col>

      </Row>
      <Row style={{justifyContent:'flex-end',alignItems:'center'}}>
        <input style={{width:200,marginRight:10,borderWidth:1,borderColor:COLORS.borderColor,borderRadius:20,height:30,padding:10, }} placeholder="Search" />
        <Avatar src={user?.profilePic?user?.profilePic:defaultImage} variant="circular" style={{marginRight:10}}/>
      </Row>
    </Header>
    {/* Header End */}
    {/* Body Start */}
   <Row>
   <Button
   onClick={()=>setIsOpen(true)}
   style={{
      fontSize: 12,
      margin: 10,
      color: COLORS.white,
      padding: 5,
      backgroundColor: COLORS.primary,
    }}>
    Create Artifacts
    </Button>
   </Row>

    <div style={{height:"100vh",display:'flex',flexDirection:'row',background:COLORS.lightGray3}}>
     {!isDetail ?
      <div className={"col-md-2"} style={{height:'100vh',borderRightColor:COLORS.lightGray,borderStyle:'solid',borderWidth:0,borderRightWidth:1}}>
              <div style={{color:COLORS.black,height:'4vh',alignSelf:'center',fontSize:16,fontWeight:'bold'}}>Module</div>
        <div className="sepratorReq" />
        { requirement.map((item:any)=>{
           return(<>
                <div className='emailRow' style={{color:COLORS.black,background:COLORS.white,height:'4vh',fontSize:15,width:'100%',cursor:'pointer',display:'flex',flexDirection:'row',justifyContent:'space-between'}} onClick={()=>{
                  setReqModule(item.requirements)
                  }} >
                  <Icon  name='arrow-right' font='Entypo'  color='#B0C3CC'  size={15} />
                      {item.moduleName}
                   <div style={{}}>
                      <DropDownMenuSelect
                        values={option3}
                        className="Requirement_style"
                        handleOnClick={(value:any) => {
                          if(value == 'Add')
                          {
                           setModuleId(item.id);
                           setProjectId(item.projectId);
                           setOpenR(true);
                          }
                          else {
                            deleteModule(item.id,item.projectId )}} }
                        />
                   </div>
                </div>

             </>
          )
        }
        )}
      </div> : null}

        <div className={isDetail?"col-md-9":"col-md-12"} style={{minHeight:"80vh",width:'75%',marginLeft:10}}>
              <Row style={{alignItems:'center',justifyContent:'space-between',height:'4vh'}} >
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold'}}>Req Name</H5>
                {/* <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold'}}>Req Status</H5>
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold'}}>Modified By</H5> */}
                {/* <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center',fontWeight:'bold'}}>Req</H5> */}
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'left',fontWeight:'bold'}}>Req Des</H5>
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'left',fontWeight:'bold'}}>Req Type</H5>
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold'}}>Attachment</H5>
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center',fontWeight:'bold'}}>Delete</H5>
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center',fontWeight:'bold'}}>Comment</H5>
                <H5 className='col-sm-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center',fontWeight:'bold'}}>Add Test Case</H5>

              </Row>
              <div className="sepratorReq" />
        {/* Sidebar Start */}




              {reqModule.map((req:any)=>{
                console.log(req)
                return(
                  <>
                    <Row style={{alignItems:'center',justifyContent:'space-between'}} >
                      <div className='col-sm-1' style={{}}>
                        <InputReq
                          className='input_req'
                          onBlur={onNameChangeHandle}
                          value={req.name}
                          />
                      </div>


                    {/* <div className='col-sm-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}>
                      <Button

                      onClick={()=>setIsdetail(!isDetail)}
                      style={{fontSize:12,textTransform:'unset'}}
                      >
                    <Icon
                      name="share-square-o"
                      font='FontAwesome'
                      color={COLORS.primary}
                      size={20} />
                      </Button>
                  </div> */}
                  <div className='col-sm-1'>
                  <InputReq
                      className='input_req'
                      onBlur={onNameChangeHandle}
                      value={req.requirementDescription}
                      />
                    </div>
                    <div className='col-sm-1' >
                  <InputReq
                      className='input_req'
                      onBlur={onNameChangeHandle}
                      value={req.requirementType}
                      />
                    </div>
                    <div className='col-sm-1'>
                      <InputReq
                          className='input_req'
                          onBlur={onNameChangeHandle}
                          value={req?.attachments?.length>0?req?.attachments[0].name:""}
                          />
                    </div>
                  <div className='col-sm-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}  onClick={()=>{ deleteReq(req.id,selectedProject.pid); }}>
                        <Button className='col-sm-1' style={{fontSize:12,textTransform:'unset'}}>
                            <Icon
                            name="delete"
                            font='AntDesign'
                            color={COLORS.primary}
                            size={20} />
                        </Button>
                    </div>
                      <div className='col-sm-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}>
                      <Button
                      className='col-sm-1'
                      onClick={()=>{
                        setReqId(req.id)
                        setIsdetail(!isDetail)}}
                      style={{fontSize:12,textTransform:'unset'}}
                      >
                      <Icon
                      name="comments-o"
                      font='FontAwesome'
                      color={COLORS.primary}
                      size={20} />
                      </Button>
                      </div>

                      <div className='col-sm-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}>
                      <Button
                      className='col-sm-1'
                      onClick={()=>{

                        setIsReqId1(req.id)
                        setIsOpenEnv(!isDetail)}}
                      style={{fontSize:12,textTransform:'unset'}}
                      >
                      <Icon
                      name="plus"
                      font='FontAwesome'
                      color={COLORS.primary}
                      size={20} />
                      </Button>
                      </div>
                    </Row>
              </>
               )} )}


        </div>

        {isDetail&&<div className="col-md-4" style={{backgroundColor:COLORS.primary,position:'absolute',right:20}}>
        <div style={{color:COLORS.white,height:'4vh',textAlign:'center',display:'flex',flexDirection:'row',justifyContent:'space-between',margin:10}}>
          Comments
          <IconButton onClick={()=>setIsdetail(!isDetail)}>
            <IconCloseButton />
          </IconButton>
        </div>
        <div className="sepratorReq" />
            <CustomComponent reqId={reqId} />
        </div>}
    </div>


  </Container>);
}


