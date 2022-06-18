import PropTypes from "prop-types"
import React from "react";

const Popup = ({width="40%",height=400,handleClose,content,style={},boxStyle={}}:any) => {
  return (
    <div className="popup-box" style={style}>
      <div className="box" style={{width: width,height: height,...boxStyle}}>
        <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>
  );
};

Popup.propTypes = {
  boxStyle: PropTypes.object,
  content: PropTypes.element,
  handleClose: PropTypes.func,
  height: PropTypes.any,
  style: PropTypes.object,
  width: PropTypes.any
}

export default Popup;
