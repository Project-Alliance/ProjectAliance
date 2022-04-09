import React,{useState} from 'react';
import { Container,Header,ProjectIcon ,Row,Col,H1,H2,Text} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import {COLORS, size} from 'renderer/AppConstants'
import { alpha, styled } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import {Avatar} from '@mui/material';
import Icon from 'react-web-vector-icons';
import Project_Goals from 'renderer/Components/Project_Goals';
import {
  GetGoals
} from 'renderer/Store/Actions/Project.Goals';

const defaultImage = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
}
export default function Goals({ ParentHistory, sideBar }: Props) {
    const [isOpen, setIsOpen] = useState(false);
     var [state,setState] = useState({textAreaValue: ""});
     const goals =  useSelector(({ProjectGoals}: any) => ProjectGoals.Goals );
     const dispatch = useDispatch();

     const togglePopup = () => {
      setIsOpen(!isOpen);
    }

     var handleChange = (event:any) =>{
       setState({textAreaValue: event.target.value  })
     }
// data required in header

  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);
  const [selectedProject,setSelectedProject] = React.useState(projects[0]);
  const user = useSelector(({auth}: any) => auth.user);

React.useEffect(() => {
  dispatch(GetGoals( '1' , user.accessToken));
},[])
  return (
  <Container style={{overflowY: "scroll"}}>
    {/* Header Start  */}
    <Header style={{justifyContent:'space-between'}}>
      <Row>
      <ProjectIcon style={{borderRadius:10}}>
        <img style={{height:35,width:35}} src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase" />

      </ProjectIcon>
      <Col style={{marginLeft:5}}>
        <H2 style={{color:COLORS.primary}}>Goals</H2>
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

    {/* Main Goals Content */}
    <Row style={{marginLeft:60,marginRight:60,justifyContent:"space-between",marginTop:20}}>
         <Project_Goals isOpen={isOpen} setIsOpen={setIsOpen} />
       <div style={{marginRight: "auto", marginLeft: "auto", width:800}}>
         <div style={{fontSize:20,fontWeight:'bold',fontFamily:'sans-serif',color:COLORS.primary}}>
           Project Allaince
         </div>
         <div style={{marginTop:10}}>
           <textarea value={state.textAreaValue} onChange={handleChange} placeholder='Add your company mission to align your work and stay inspired. Only members with full access can edit.' style={{fontSize:14,width:600,borderColor: 'grey',height:50, borderWidth:1,borderStyle:'dotted',borderColor:'white' }}></textarea>
         </div>

         <div style={{}}>
         <button
          onClick={(props: any) => {
             setIsOpen(!isOpen);

            }}
            style={{color:"black",fontSize:20,fontWeight:'bold',fontFamily:'sans-serif',color:'#007FFF'}}
            className="Create-Project-Div">
             Goals
           <Icon  name='plus' font='Entypo'  color="#007FFF"  size={20} style={{marginLeft:10}}/>
          </button>
         </div>
         <div style={{marginTop:10}}>
        {goals?.map((item: any)=>(
           <div style={{height:100,backgroundColor:'#F0F7FF', width:700,borderRadius:10,marginBottom:10,borderStyle:'solid',borderWidth:0.5,borderColor:'#007FFF', marginLeft:10,display:'flex',justifyContent:'space-between'}}>
                <div >
                   <div style={{margin:10,fontFamily:'sans-serif',fontWeight:'bold',}}> { item.goalName } </div>
                    <div style={{marginTop:30,marginLeft:10,fontFamily:'sans-serif',}}>{item.goalDescription }</div>
                </div>
                <div style={{marginLeft:10}}>
                    <div style={{margin:10,fontFamily:'sans-serif'}}>{item.statingDate}</div>
                    <div style={{marginTop:30,marginLeft:10,fontFamily:'sans-serif'}}>{item.endingDate}</div>
                </div>
            </div>
           ))}
         </div>

       </div>
      </Row>

  </Container>);
}


const MainBody = styled('div')`
display: flex;
font-size: ${size.normalFont};
font-family: ${size.fontFamily};
height: 100%;
width: 100%;
`;
const Body = styled('div')`
font-size: inherit;
font-family: inherit;
height: ${size.headerHeight+1}px;
display: flex;
width: 100%;
align-items: center;
flex-direction: row;
justify-content: space-between;
border-bottom: 1px solid ${COLORS.borderColor};
padding-left: ${size.padding}px;
padding-right: ${size.padding}px;
`;
