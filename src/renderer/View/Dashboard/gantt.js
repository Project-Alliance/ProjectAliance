import React, { useEffect, useRef } from "react";

import Gantt from "frappe-gantt";
import "./style.scss";




function TimeLine({ data,onViewChange,onDateChange,onProgressChange,onClick,ref,chart }) {


  return <div style={{width:"100%"}}>
    <svg  id="gantt" ref={ref}></svg>
  </div>;
}

export default TimeLine;
