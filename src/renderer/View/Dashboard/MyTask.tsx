import { Avatar } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Task_Schedule_Gantt from 'renderer/Components/Add_Task_Schedule/Task_Schedule_Gantt';
import {
  Col,
  H1,
  H2,
  Header,
  ProjectIcon,
  Row,
} from 'renderer/Components/layout';
import InputButton from 'renderer/Components/InputButton';
import TimeLine from './gantt';
import { COLORS, size } from 'renderer/AppConstants';
import { defaultImage } from 'renderer/Constant/Images';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';

import Gantt from 'frappe-gantt';
import { formatDate, Props } from 'renderer/Components/Add_Task_Schedule/CustomGridCompoment';

import Add_Schedule from 'renderer/Components/Add_Task_Schedule/Add_Schedule';
import Api from "renderer/Api/auth.api";
import "./style.scss";
import {Notification} from 'renderer/Util/Notification/Notify';
import { projectScheduleModelType } from 'renderer/Components/Add_Task_Schedule/ScheduleModel';



const returnDuration = (startDate: string, endDate: string) => {
  var a = moment(startDate, 'YYYY-MM-DD');
  var b = moment(endDate, 'YYYY-MM-DD');
  return b.diff(a, 'days');
};

const Data = [
  {
    id: 'insert',
    name: '',
    start: formatDate(new Date()),
    end: formatDate(new Date()),
    progress: 0,
    dependencies: '',
    duration: '',
  },

];

const gannttData= (item:any)=>({
  id: item.id,
  name: item.name,
  start: new Date(item.start),
  end: new Date(item.end),
  progress: item.progress,
  dependencies: item.dependencies,
  duration: item.duration,

})
const MyTask = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  var [state, setState] = useState({ textAreaValue: '' });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [data,setData]=React.useState<any>(Data);
  const [rowData, setRowData] = useState<projectScheduleModelType>(data);


  const projects = useSelector(({ Project }: any) =>
    Project?.data?.projects ? Project?.data?.projects : []
  );

  const user = useSelector(({ auth }: any) => auth.user);
  const DefaultProject = useSelector(
    ({ SelectedProject }: any) => SelectedProject
  );
  const [selectedProject, setSelectedProject] = React.useState(
    DefaultProject?.pid != undefined ? DefaultProject : projects[0]
  );


  // Gannt Chart coding detail

  const ref = useRef<SVGSVGElement>(null);
  const chart = useRef<any>();
  const [view, setView] = React.useState({ GridView: '50%', GanttView: '50%' });


  const getSchedule=()=>{
    Api.GetSchedule(selectedProject?.pid,user?.token)
    .then(res=>{
      if(res.status==200)
      {
        let DATA=res.data.map((item:any)=>({
          id:item.id.toString(),
          name:item.name,
          start:formatDate(item.start),
          end:formatDate(item.end),
          progress:item.progress,
          dependencies:item?.dependancies,
          duration:returnDuration(item.start,item.end)
        }))
        console.log(DATA)
      chart.current.refresh(DATA.map((item:any)=>gannttData(item)))
      setData(DATA)
      }
    }).catch(err=>{
      console.error(err)
    })
  }
  React.useEffect(()=>{
      getSchedule()

  },[selectedProject])






  function onDateChange(task: any, start: any, end: any) {
    const data = {
      "name" : task.name,
      "start":task._start,
      "end" :  task._end,
      "dependancies" :  task.dependencies.join(","),
      "progress":task.progress,
      id:task.id
    };

    alert(JSON.stringify(data))

      Api.updateSchedule(task.id,data,user?.accessToken)
      .then((res) => {

        if (res.status == 200) {
          Notification('Crearted', res.data.message, 'success');
          getSchedule();
      } else {
        Notification("Error",res.data.message,"danger");
      }
    })
    .catch((err) => {
      debugger
      if(err?.message=="Network Error")
      Notification("Error what","Network Error","danger");
      else
      Notification("Error here",JSON.stringify(err),"danger");

    });

  }

  function onProgressChange(task: any, progress: any) {
    console.log(task, progress);
  }

  function onClick(task: any) {
    console.log(task);
  }

  function handleViewChange(event: any) {
    if (event.target.value == 'GridView') {
      setView({ GridView: '100%', GanttView: '0%' });
      console.log(
        (view.GridView == '50%' || view.GridView == '100%') &&
          view.GanttView != '100%'
      );
      return;
    }
    if (event.target.value == 'GanttView') {
      setView({ GridView: '0%', GanttView: '100%' });
      return;
    } else {
      setView({ GridView: '50%', GanttView: '50%' });
      return;
    }
  }


  useEffect(() => {
    if (chart.current) return;

    chart.current = new Gantt(ref.current, data, {
      on_date_change: onDateChange,
      on_progress_change: onProgressChange,
      on_click: onClick,
    });
  }, [data]);

  const handleDuabbleClick =async(params:Props)=>{
    // console.log(params.row)
    await setRowData(params.row)
    setIsOpenUpdate(true);

  }

  return (
    <div className="Main_Task_List">
      {/* <TodoList /> */}
      <Header style={{ justifyContent: 'space-between' }}>
        <Row>
          <ProjectIcon style={{ borderRadius: 10 }}>
            <img
              style={{ height: 35, width: 35 }}
              src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
              alt="firebase"
            />
          </ProjectIcon>
          <Col style={{ marginLeft: 5 }}>
            <H2 style={{ color: COLORS.primary }}>Project Schedule</H2>
            <Row style={{ alignItems: 'center' }}>
              <H1>{selectedProject?.projectTitle}</H1>
              <select
                style={{ width: 15, height: 20, border: 'none', marginLeft: 5 }}
                value={selectedProject?.pid}
                onChange={(e) =>
                  setSelectedProject(
                    projects.filter(
                      (item: any) => item.pid == e.target.value
                    )[0]
                  )
                }
              >
                {projects?.map((item: any) => (
                  <option value={item.pid}>{item.projectTitle}</option>
                ))}
              </select>

            </Row>

          </Col>
        </Row>
        {isOpen&&<Add_Schedule getSchedule={getSchedule} ProjectId={selectedProject?.pid} isOpen={isOpen} setIsOpen={setIsOpen} />}
{        isOpenUpdate&&<Add_Schedule getSchedule={getSchedule} ProjectId={selectedProject?.pid} isOpen={isOpenUpdate} setIsOpen={setIsOpenUpdate} update={true} DATA={rowData} />
}        <Row style={{marginLeft:'23rem'}}>
        <div >
              <InputButton
               onClick={() => {
                setIsOpen(!isOpen);
              }}
                className="Create-Button"
                buttonStyle={{
                  backgroundImage: ` linear-gradient(to right, #0905AF 0%, #0905AF 47%, #0905AF 100%)`,
                  boxShadow: `3.994px 22.651px 57px rgba(97, 73, 205, 0.259)`,
                  color: '#FFFFFF',
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="ADD"
              />
            </div>
        </Row>
        <Row style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <Tooltip title="Select View">
            <select
              className="btn"
              style={{ marginRight: 10 }}
              onChange={handleViewChange}
            >
              <option value="">Select View</option>
              <option value="GridView">Data Grid</option>
              <option value="GanttView">Gantt</option>
              <option value="Normal">Normal</option>
            </select>
          </Tooltip>
          <input
            style={{
              width: 200,
              marginRight: 10,
              borderWidth: 1,
              borderColor: COLORS.borderColor,
              borderRadius: 20,
              height: 30,
              padding: 10,
            }}
            placeholder="Search"
          />
          <Avatar
            src={user?.profilePic ? user?.profilePic : defaultImage}
            variant="circular"
            style={{ marginRight: 10 }}
          />
        </Row>

      </Header>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            width: view.GridView,
            display:
              (view.GridView == '50%' || view.GridView == '100%') &&
              view.GanttView != '100%'
                ? 'block'
                : 'none',
            border: '0.1px solid #FFFFFF',
          }}
        >
          <Task_Schedule_Gantt data={data} handleEdit={handleDuabbleClick} />
          {/* <Table theadData={theadData} tbodyData={tbodyData} /> */}
        </div>

{/* Gant Chart Sets here */}
        <div
          style={{
            border: 1,
            borderStyle: 'solid',
            borderColor: '#26c7e7',
            width: view.GanttView,
            display:
              (view.GanttView == '50%' || view.GanttView == '100%') &&
              view.GridView != '100%'
                ? 'block'
                : 'none',
            height: '100%',
          }}
        >
         <div style={{border:1,borderStyle:'solid',borderColor:'#26c7e7',height:600}}>
      <div style={{width:"100%",}}>
        <svg  id="gantt" ref={ref}></svg>
      </div>
     </div>
          <div className="mx-auto mt-3 btn-group" role="group">
            <button
              type="button"
              onClick={() => chart?.current?.change_view_mode('Quarter Day')}
              className="btn btn-sm btn-light"
            >
              Quarter Day
            </button>
            <button
              type="button"
              onClick={() => chart?.current?.change_view_mode('Half Day')}
              className="btn btn-sm btn-light"
            >
              Half Day
            </button>
            <button
              type="button"
              onClick={() => chart?.current?.change_view_mode('Day')}
              className="btn btn-sm btn-light"
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => chart?.current?.change_view_mode('Week')}
              className="btn btn-sm btn-light"
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => chart?.current?.change_view_mode('Month')}
              className="btn btn-sm btn-light active"
            >
              Month
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyTask;
