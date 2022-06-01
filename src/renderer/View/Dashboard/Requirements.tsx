import React, { useEffect, useState } from 'react';
import { Container,Header,ProjectIcon ,Row,Col,H1,H2,SCard,Text
,ChartBox,
InputP
} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { COLORS } from 'renderer/AppConstants';
import { useDispatch, useSelector } from 'react-redux';
import {Avatar,Button} from '@mui/material';
import Popup from '../CreateProjectForm/Popup';
import { Notification } from 'renderer/Util/Notification/Notify';
import Api from 'renderer/Api/auth.api';
import CreateProjectPopup from 'renderer/Components/RequirementComponent/CreateModulePopup';
import { truncateSync } from 'original-fs';
import Icon from 'react-web-vector-icons';



const defaultImage = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  sideBar?: string;
  history: RouteComponentProps['history'];
}

export default function Requirements({ history, sideBar }: Props) {


// data required in header
  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);

  const user = useSelector(({ auth }: any) => auth?.user);
  const selectedProject = useSelector(({SelectedProject}: any) => SelectedProject);
  const [isOpen,setIsOpen] = useState(false);
  const [requirement,setRequirement]=useState([]);
  const [isDetail,setIsdetail]=useState(false)
  const [dataModel,setDataModel]=useState({name:"",status:""})
  const getRequirements=async ()=>{
   let req=await Api.getRequirementModule(selectedProject.pid,user.accessToken)
    .catch(err=>{
      console.log(err)
    })
    if(req?.data){
      console.log(req.data)
    setRequirement(req?.data);}
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
    <div className="row" style={{height:"100vh"}}>
      <div className={isDetail?"col-md-9":"col-md-12"} style={{height:"100vh"}}>
      <Row style={{alignItems:'center',justifyContent:'space-between'}} >
                <H2 className='col-md-2' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold',textAlign:'left'}}>Name</H2>
                <H2 className='col-md-2' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold',textAlign:'left'}}>Status</H2>
                <H2 className='col-md-2' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold'}}>Modified BY</H2>
                <H2 className='col-md-2' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',fontWeight:'bold'}}>Modified On</H2>
                <H2 className='col-md-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center',fontWeight:'bold'}}>Requirements</H2>

                <H2 className='col-md-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center',fontWeight:'bold'}}>Delete</H2>
                <H2 className='col-md-1' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center',fontWeight:'bold'}}>Comments</H2>
              </Row>
        {/* Sidebar Start */}
        {requirement.map((item:any)=>{
          return(
              <Row style={{alignItems:'center',justifyContent:'space-between'}} >

                <InputP
                className='col-md-2'
                onBlur={onNameChangeHandle}
                defaultValue={item.moduleName} />
                <InputP
                className='col-md-2'
                onBlur={onStatusChangeHandle}
                defaultValue={item.moduleStatus} />
                <H2 className='col-md-2' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center'}}>{item.modifiedBy}</H2>
                <H2 className='col-md-2' style={{color:COLORS.black,fontSize:12,fontFamily:'sans-serif',textAlign:'center'}}>{item.modifeidOn}</H2>
              <div className='col-md-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}>
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
</div><div className='col-md-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}>
                <Button
                className='col-md-1'
                onClick={()=>setIsdetail(!isDetail)}
                style={{fontSize:12,textTransform:'unset'}}
                >
                <Icon
                name="delete"
                font='AntDesign'
                color={COLORS.primary}
                size={20} />
                </Button></div><div className='col-md-1' style={{justifyContent:'center',alignItems:"center",display:'flex'}}>
                <Button
                className='col-md-1'
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

          )
        })}
        </div>
        {isDetail&&<div className="col-md-3" style={{height:"100vh"}}>
        </div>}
    </div>


  </Container>);
}


