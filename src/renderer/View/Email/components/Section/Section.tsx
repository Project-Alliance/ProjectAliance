import PropTypes from "prop-types"
import React from "react";
import "./Section.css";

function Section({ Icon, title, color, selected,onClick }:any) {
  return (
    <div
    onClick={onClick}
      className={`section ${selected && "section--selected"}`}
      style={{
        borderBottom: `3px solid ${color}`,
        color: `${selected && color}`,
      }}
    >
      <Icon color={color} />
      <h4>{title}</h4>
    </div>
  );
}

Section.propTypes = {
  Icon: PropTypes.any,
  color: PropTypes.any,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  title: PropTypes.any
}

export default Section;
