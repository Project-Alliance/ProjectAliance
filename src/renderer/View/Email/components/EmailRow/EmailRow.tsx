import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import "./EmailRow.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import { useHistory } from "react-router-dom";
import { selectMail } from "../../features/mailSlice";
import { useDispatch } from "react-redux";
import Api from "renderer/Api/auth.api";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Star from "@mui/icons-material/Star";
import { COLORS } from "renderer/AppConstants";


function EmailRow({ id, title, subject, description, time ,isRead=true,updateFunction=()=>{},isStared=false,from,mailAttachment}:any) {
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const openMail =async () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        description,
        time,
        from,
        mailAttachment
      })
    );
    if(!isRead){
     let res = await Api.markAsRead(id,user?.accessToken).catch(err=>console.log(err));
     if(res?.status==200){
      updateFunction()
    }
    }
    history.push("/mail");
  };
  const starMail =async() => {
    debugger;
     let res= await  Api.starMail(id,user?.accessToken).catch(err=>console.log(err));
     if(res?.status==200){
       updateFunction()
     }
  }
  return (
    <div onClick={openMail} className="emailRow">
      <div className="emailRow-options">
        <Checkbox />
        <IconButton onClick={starMail}>
          {isStared?<Star color="primary" />:<StarBorderOutlinedIcon  /> }
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>
      <h3 className="emailRow-title" style={{fontWeight:isRead?"normal":"bold"}}>{title}</h3>
      <div className="emailRow-message">
        <h4>
          {subject}{" "}
          <span className="emailRow-description"> - {description}</span>
        </h4>
      </div>
      <p className="emailRow-time">{time}</p>
    </div>
  );
}

export default EmailRow;
