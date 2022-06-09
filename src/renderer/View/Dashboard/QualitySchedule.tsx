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

import Add_Schedule from 'renderer/Components/Add_Task_Schedule/Add_Test_Schedule';
import Api from "renderer/Api/auth.api";
import "./style.scss";
import {Notification} from 'renderer/Util/Notification/Notify';
import { projectScheduleModel, projectScheduleModelType } from 'renderer/Components/Add_Task_Schedule/ScheduleModel';

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
const QualitySchedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  var [state, setState] = useState({ textAreaValue: '' });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [rowData, setRowData] = useState<projectScheduleModelType>(projectScheduleModel);
  const [data, setData] = React.useState<any>(Data);

  React.useEffect(() => {
    getSchedule();
  }, []);



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
    Api.GetQualitySchedule(selectedProject?.pid,user?.token)
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



      Api.updateQualitySchedule(task.id,data,user?.accessToken)
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


  function onProgressChange(task: any, progress:number) {
    console.log(task,"skldfj",progress)
    const data = {
      "name" : task.name,
      "start":task.start,
      "end" :  task.end,
      "dependancies" :  task.dependencies.join(","),
      "progress":task.progress,
      id:task.id
    };



      Api.updateQualitySchedule(task.id,data,user?.accessToken)
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
    <div className="Main_Task_List" >
      {/* <TodoList /> */}


        {isOpen&&<Add_Schedule getSchedule={getSchedule} ProjectId={selectedProject?.pid} isOpen={isOpen} setIsOpen={setIsOpen} />}
{        isOpenUpdate&&<Add_Schedule getSchedule={getSchedule} ProjectId={selectedProject?.pid} isOpen={isOpenUpdate} setIsOpen={setIsOpenUpdate} update={true} DATA={rowData} />
}

              <InputButton
               onClick={() => {

                setIsOpen(!isOpen);
              }}
              className="Create-Button btn"
              buttonStyle={{

                color: COLORS.primary,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                position:'absolute',
                textTransform:'unset',
                left:'50%',
                zIndex:1
              }}
              title="Add"
            />




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

export default QualitySchedule;
