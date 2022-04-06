import React from "react";

const Popup = ({width="40%",height=400,...props}:any) => {
  return (
    <div className="popup-box">
      <div className="box" style={{width: width,height: height}}>
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
