import React from 'react';
import { Container,Header,ProjectIcon ,Row,Col,H1,H2,Text} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { COLORS } from 'renderer/AppConstants';
import { useSelector } from 'react-redux';
import {Avatar} from '@mui/material';


const defaultImage = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
}
export default function ReportingScreen({ ParentHistory, sideBar }: Props) {


// data required in header
  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);
  const [selectedProject,setSelectedProject] = React.useState(projects[0]);
  const user = useSelector(({User}: any) => User?.data?.user);


  return (
  <Container>
    {/* Header Start  */}
    <Header style={{justifyContent:'space-between'}}>
      <Row>
      <ProjectIcon style={{borderRadius:10}}>
        <img style={{height:35,width:35}} src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase" />

      </ProjectIcon>
      <Col style={{marginLeft:5}}>
        <H2 style={{color:COLORS.primary}}>Reporting</H2>
        <Row style={{alignItems:'center'}}>
        <H1>{selectedProject?.projectTitle}</H1>
        <select style={{width:15,height:20,border:"none",marginLeft:5}} value={selectedProject?.pid} onChange={(e)=>setSelectedProject(projects.filter((item:any)=>item.pid==e.target.value)[0])}>
          {projects?.map((item:any)=>(
            <option value={item.pid}>{item.projectTitle}</option>
          ))}
        </select>


        </Row>
      </Col>

      </Row>
      <Row style={{justifyContent:'flex-end',alignItems:'center'}}>
        <input style={{width:200,marginRight:10,borderWidth:1,borderColor:COLORS.borderColor,borderRadius:20,height:30,padding:10, }} placeholder="Search" />
        <Avatar src={user?.profilePic?user?.profilePic:defaultImage} variant="circular" style={{marginRight:10}}/>
      </Row>
    </Header>
    {/* Header End */}

  </Container>);
}
