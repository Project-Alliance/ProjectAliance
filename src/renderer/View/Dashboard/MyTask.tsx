import React, { useState } from "react";
import Table from "renderer/Components/Add_Task_Schedule/Schedule_Table";
// import InputButton from "renderer/Components/InputButton";
// import Icon from 'react-web-vector-icons';
// import AddTask  from 'renderer/Components/Add_Task_Schedule/Add_Task';
// import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
// import TodoList from 'renderer/Components/TodoList/TodoList';
import Task_Schedule_Gantt from 'renderer/Components/Add_Task_Schedule/Task_Schedule_Gantt';
import TimeLine from './gantt';


const theadData = ["Name", "Email", "Date"];

    const tbodyData = [
        {
            id: "1",
            items: ["John", "john@email.com", "01/01/2021"],
        },
        {
            id: "2",
            items: ["Sally", "sally@email.com", "12/24/2020"],
        },
        {
            id: "3",
            items: ["Maria", "maria@email.com", "12/01/2020"],
        },
    ];



  const  MyTask = ({
    showAddTaskMain = true,
    shouldShowMain = false,
  }) => {
    const [task, setTask] = useState('');

    const [showMain, setShowMain] = useState(shouldShowMain);
    // const [showProjectOverlay, setShowProjectOverlay] = useState(false);

  return (
  <div className="Main_Task_List">
     {/* <TodoList /> */}
     <div style={{ backgroundColor:"#0d6efd",}}>

      <div style={{marginLeft:'2.5rem',color:'#e9ecef'}}>
            <h4>Project Schedule MileStones!</h4>
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:'0.5rem'}}>
            <h4 style={{fontWeight:'bold',color:'#e9ecef'}}>GANTT CHART</h4>
      </div>
      </div>

     <div style={{display:"flex",flexDirection:'row',}}>
       <div style={{width:'50%',border: "0.1px solid #FFFFFF"}}>
       <Task_Schedule_Gantt />
       {/* <Table theadData={theadData} tbodyData={tbodyData} /> */}
       </div>
       <div style={{width:'50%',border: "0.1px solid #FFFFFF"}}>
       <TimeLine />
       </div>
     </div>


  </div>
  );
}

export default MyTask;
