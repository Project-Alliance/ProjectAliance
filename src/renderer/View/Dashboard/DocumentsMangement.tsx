import React from 'react';
import { Container,Header,ProjectIcon ,Row,Col,H1,H2,SCard,Text
,ChartBox
} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { COLORS,size } from 'renderer/AppConstants';
import { useSelector } from 'react-redux';
import {Avatar,Button} from '@mui/material';


const defaultImage = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  sideBar?: string;
  history: RouteComponentProps['history'];
}

export default function DocumentManagement({ history, sideBar }: Props) {


// data required in header
  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);

  const user = useSelector(({User}: any) => User?.data?.user);
  const selectedProject = useSelector(({SelectedProject}: any) => SelectedProject);
  const styles={
    ButtonHover:{

    }
  }



  return (
  <Container style={{overflowY:"scroll"}}>
    {/* Header Start  */}
    <Header style={{justifyContent:'space-between'}}>
      <Row>
      <ProjectIcon style={{borderRadius:10}}>
        <img style={{height:35,width:35}} src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase" />

      </ProjectIcon>
      <Col style={{marginLeft:5}}>
        <H2 style={{color:COLORS.primary}}>Document Management</H2>
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

   <Row style={{paddingLeft:20,paddingTop:10}}>
   <button className='btn ' style={{fontSize:size.normalFont,textTransform:"unset",fontFamily:size.fontFamily,backgroundColor:COLORS.primary,color:COLORS.white}}>
      Add Document
    </button>
   </Row>



  </Container>);
}

