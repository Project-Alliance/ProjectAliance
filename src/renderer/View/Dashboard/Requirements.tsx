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
// import { DataGrid } from '@mui/x-data-grid';
// import Requirement_GridView from 'renderer/Components/RequirementComponent/Requirement_GridView';
// import TreeView from "@mui/lab/TreeView";
import DropDownMenuSelect from 'renderer/Components/DropDownMenue';
import CustomComponent from 'renderer/Components/Comments/comment';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { TreeItem } from '@mui/lab';
// import { TreeView } from '@mui/lab';

const defaultImage = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';
interface Props {
  sideBar?: string;
  history: RouteComponentProps['history'];
}
export default function Requirements({ history, sideBar }: Props) {

  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };
// data required in header
  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);

  const user = useSelector(({ auth }: any) => auth?.user);
  const selectedProject = useSelector(({SelectedProject}: any) => SelectedProject);
  const [isOpen,setIsOpen] = useState(false);
  const [isOpenR,setOpenR] = useState(false);
  const [requirement,setRequirement]=useState([]);
  const [reqModule,setReqModule] = useState([]);
  const [isDetail,setIsdetail]=useState(false)
  const [moduleId,setModuleId]=useState(0);
  const [projectId,setProjectId]=useState(0);

  const [dataModel,setDataModel]=useState({name:"",status:""})
  const getRequirements=async ()=>{
   let req=await Api.getRequirementModule(selectedProject.pid,user.accessToken)
    .catch(err=>{
      console.log(err)
    })
    if(req?.data){
      console.log("data is hereeeeeeeeeeeee",req.data)
    setRequirement(req?.data);}
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
    let req=await Api.deleteRequirement(rid,projectId,user.accessToken)
    .catch(err=>{
      console.log(err)
    })
    if(req?.data){
      console.log(req.data)
    getRequirements();}
  }


  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, name: event.target.value });
  };
  const onStatusChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, status: event.target.value });
  };

  useEffect(() => {
    if(requirement.length==0)
    getRequirements()
  }, [requirement])

  return (
  <Container style={{overflowY:"scroll"}}>
    {/* Header Start  */}
    <CreateProjectPopup isOpen={isOpen} setIsOpen={setIsOpen} projectId={selectedProject.pid} />
    {isOpenR&&moduleId&&<CreateRequirementPopUp isOpen={isOpenR} setIsOpen={setOpenR} projectId={selectedProject.pid} moduleId={moduleId}   />}

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
    Create Module
    </Button>
   </Row>
    <div style={{height:"100vh",display:'flex',flexDirection:'row',background:COLORS.lightGray3}}>
     {!isDetail ?
      <div className={"col-md-2"} style={{height:'100vh',backgroundColor:COLORS.primary}}>
              <div style={{color:COLORS.white,height:'4vh',marginLeft:20}}>Module</div>
        <div className="sepratorReq" />
        { requirement.map((item:any)=>{
           return(<>

             <div style={{display:'flex',flexDirection:'row',marginTop:14,marginBottom:20}}>
                <div style={{color:COLORS.white,height:'4vh',marginLeft:10,fontSize:15,width:'100%',cursor:'pointer',display:'flex',flexDirection:'row'}} onClick={()=>{ handleClick();

                  setReqModule(item.requirements)}} >
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
             </div>
             </>
          )
        }
        )}
      </div> : null}

        <div className={isDetail?"col-md-9":"col-md-12"} style={{height:"100vh",width:'75%',marginLeft:10}}>
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
              </Row>
              <div className="sepratorReq" />
        {/* Sidebar Start */}




              {reqModule.map((req:any)=>{
                return(
                  <>
                    <Row style={{alignItems:'center',justifyContent:'space-between'}} >
                      <div className='col-sm-1' style={{}}>
                        <InputReq
                          className='input_req'
                          onBlur={onNameChangeHandle}
                          defaultValue={req.name}
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
                      defaultValue={req.requirementDescription}
                      />
                    </div>
                    <div className='col-sm-1' >
                  <InputReq
                      className='input_req'
                      onBlur={onNameChangeHandle}
                      defaultValue={req.requirementType}
                      />
                    </div>
                    <div className='col-sm-1'>
                      <InputReq
                          className='input_req'
                          onBlur={onNameChangeHandle}
                          defaultValue={req?.attachments?.length>0?req?.attachments[0].name:""}
                          />
                    </div>
                  <div className='col-sm-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}  onClick={()=>{ deleteReq(req.id,selectedProject.pid)}}>
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
                      onClick={()=>setIsdetail(!isDetail)}
                      style={{fontSize:12,textTransform:'unset'}}
                      >
                      <Icon
                      name="comments-o"
                      font='FontAwesome'
                      color={COLORS.primary}
                      size={20} />
                      </Button>
                      </div>
                    </Row>
              </>
               )} )}


        </div>

        {isDetail&&<div className="col-md-4" style={{height:"100vh",backgroundColor:COLORS.primary}}>
        <div style={{color:COLORS.white,height:'4vh',textAlign:'center'}}>Comments</div>
        <div className="sepratorReq" />
            <CustomComponent />
        </div>}
    </div>


  </Container>);
}
