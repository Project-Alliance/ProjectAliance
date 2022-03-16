import React, { useState } from "react";
// import InputButton from "renderer/Components/InputButton";
// import Icon from 'react-web-vector-icons';
// import AddTask  from 'renderer/Components/Add_Task_Schedule/Add_Task';
// import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
// import TodoList from 'renderer/Components/TodoList/TodoList';
import Task_Schedule_Gantt from 'renderer/Components/Add_Task_Schedule/Task_Schedule_Gantt';
import TimeLine from './gantt';
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
     <div style={{ backgroundColor:"#5A67BA",}}>

      <div style={{marginLeft:'2.5rem',color:'white'}}>
            <h4>Here Is Your Schedule!</h4>
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:'0.5rem'}}>
            <h4 style={{fontWeight:'bold',color:'white'}}>GANTT CHART</h4>
      </div>
      </div>

     <div style={{display:"flex",flexDirection:'row',}}>
       <div style={{width:'50%',border: "0.1px solid #FFFFFF"}}>
       <Task_Schedule_Gantt />
       </div>
       <div style={{width:'50%',border: "0.1px solid #FFFFFF"}}>
       <TimeLine />
       </div>
     </div>


  </div>
  );
}

export default MyTask;
