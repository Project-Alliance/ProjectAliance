import React from 'react';
import { Container,Header,ProjectIcon ,Row,Col,H1,H2,SCard,Text
,ChartBox
} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { COLORS } from 'renderer/AppConstants';
import { useSelector } from 'react-redux';
import {Avatar} from '@mui/material';
import {VictoryChart,VictoryScatter,VictoryPie,VictoryLegend,VictoryPolarAxis,VictoryBar,VictoryTheme} from 'victory';


const defaultImage = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
  history: RouteComponentProps['history'];
}

const smapleData=[
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 }
]

export default function ReportingScreen({ ParentHistory,history, sideBar }: Props) {


// data required in header
  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);
  const [selectedProject,setSelectedProject] = React.useState(projects[0]);
  const user = useSelector(({User}: any) => User?.data?.user);
  const [state,setState] = React.useState<any>({})
  const data = [
    { x: "Upcomming", y: 2 }, { x: "Due", y: 2 }, { x: "Completed", y: 3 }
  ];
  const legendData = [
    { name: "Upcomming" }, { name: "Due" }, { name: "Completed" }
  ];
  function getScatterData() {
    const colors =[
      "violet", "cornflowerblue", "gold", "orange",
      "turquoise", "tomato", "greenyellow"
    ];
    const symbols = [
      "circle", "star", "square", "triangleUp",
      "triangleDown", "diamond", "plus"
    ];
    return Array.from(Array(50).keys()).map((index) => {
      const scaledIndex = Math.floor(index % 7);
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random()*8 + 3,
        symbol: symbols[scaledIndex],
        fill: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.6
      };
    });
  }
  React.useEffect(()=>{
    let setStateInterval = setInterval(() => {
      setState({
        scatterData: getScatterData()
      });
    }, 3000);
    return () => clearInterval(setStateInterval);
  },[])




  return (
  <Container style={{overflowY:"scroll"}}>
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

    <Row style={{marginLeft:60,marginRight:60,justifyContent:"space-between",marginTop:20}}>
      <SCard
      title="Completed Task"
      value={selectedProject?.completedTask||0}
      onClick={()=>history?.push(`/reporting/${selectedProject?.pid}/completedTask`)}
      />
      <SCard
      title="Incomplete Task"
      value={selectedProject?.Incomplete||0}
      onClick={()=>history?.push(`/reporting/${selectedProject?.pid}/incompletedTask`)}
      />
      <SCard
      title="Due Task"
      value={selectedProject?.DueTask||0}
      onClick={()=>history?.push(`/reporting/${selectedProject?.pid}/DueTask`)}
      />
      <SCard
      title="Total Task"
      value={selectedProject?.totalTask||0}
      onClick={()=>history?.push(`/reporting/${selectedProject?.pid}/totalTask`)}
      />
    </Row>

    <Row style={{marginLeft:60,marginRight:60,marginTop:20,justifyContent:'space-between'}}>
      <ChartBox>
        <H2 style={{alignSelf:'flex-start',margin:15,color:COLORS.darkgray,fontSize:18}}>Task Completion</H2>
       <Row style={{height:300,width:"100%",padding:10}}>

       <svg width={420} height={250}>

        <VictoryPie standalone={false}
          width={350} height={220}
          colorScale={[COLORS.blue1[700], COLORS.blue1[500], COLORS.blue1[200]]}
          data={data}
          innerRadius={100}
          labels={() => null}
        />
         <VictoryLegend standalone={false}
          colorScale={[COLORS.blue1[700], COLORS.blue1[500],COLORS.blue1[200] ]}
          x={300} y={40}
          gutter={20}
          title="Legend"
          centerTitle
          style={{ border: { stroke: COLORS.lightGray } }}
          data={legendData}
        />
      </svg>




       </Row>
      </ChartBox>
      <ChartBox>
        <H2 style={{alignSelf:'flex-start',margin:15,color:COLORS.darkgray,fontSize:18}}>Incompleted Tasks</H2>
       <Row style={{height:300,width:"100%",padding:10,justifyContent:'center',alignItems:'center'}}>

       <div>
      <VictoryChart polar
        theme={VictoryTheme.material}
        height={300}
        width={420}
      >
        <VictoryPolarAxis/>
        <VictoryBar

          labels={() => null}  // remove labels from bar chart
          data={data}
          style={{ data: { fill: COLORS.blue, stroke: "black", strokeWidth: 2 }}}
        />

      </VictoryChart>
    </div>




       </Row>
      </ChartBox>


    </Row>

    <Row style={{marginLeft:60,marginRight:60,marginTop:20,marginBottom:30,justifyContent:'space-between'}}>
      <ChartBox>
        <H2 style={{alignSelf:'flex-start',margin:15,color:COLORS.darkgray,fontSize:18}}>Task Completion</H2>
       <Row style={{height:300,width:"100%",padding:10}}>

       <svg width={420} height={250}>

        <VictoryPie standalone={false}
          width={350} height={220}
          colorScale={[COLORS.blue1[700], COLORS.blue1[500], COLORS.blue1[200]]}
          data={data}
          innerRadius={100}
          labels={() => null}
        />
         <VictoryLegend standalone={false}
          colorScale={[COLORS.blue1[700], COLORS.blue1[500],COLORS.blue1[200] ]}
          x={300} y={40}
          gutter={20}
          title="Legend"
          centerTitle
          style={{ border: { stroke: COLORS.lightGray } }}
          data={legendData}
        />
      </svg>




       </Row>
      </ChartBox>
      <ChartBox>
        <H2 style={{alignSelf:'flex-start',margin:15,color:COLORS.darkgray,fontSize:18}}>Task Completion</H2>
       <Row style={{height:300,width:"100%",padding:10}}>

       <svg width={420} height={250}>

        <VictoryPie standalone={false}
          width={350} height={220}
          colorScale={[COLORS.blue1[700], COLORS.blue1[500], COLORS.blue1[200]]}
          data={data}
          innerRadius={100}
          labels={() => null}
        />
         <VictoryLegend standalone={false}
          colorScale={[COLORS.blue1[700], COLORS.blue1[500],COLORS.blue1[200] ]}
          x={300} y={40}
          gutter={20}
          title="Legend"
          centerTitle
          style={{ border: { stroke: COLORS.lightGray } }}
          data={legendData}
        />
      </svg>




       </Row>
      </ChartBox>


    </Row>






   {!projects&&<>
    {!projects&&<div style={{height:500,width:500,alignSelf:'center',backgroundColor:"#fff"}}>
    <VictoryChart animate={{ duration: 2000, easing: "bounce", }}>
        <VictoryScatter
          data={state?.scatterData}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
              opacity: ({ datum }) => datum.opacity
            }

          }}

        />
      </VictoryChart>

    </div>}
    {!projects&&<h1 style={{fontSize:30,textAlign:'center'}}>
        No Task or Project Yet
      </h1>}
   </>}


  </Container>);
}
