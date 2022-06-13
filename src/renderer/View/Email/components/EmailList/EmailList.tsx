import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoIcon from "@mui/icons-material/Redo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import InboxOutlined from "@mui/icons-material/InboxOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PeopleOutlineOutlined from "@mui/icons-material/PeopleOutlineOutlined";
import Star from "@mui/icons-material/Star";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";
import Api from "renderer/Api/auth.api";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { TrySharp } from "@mui/icons-material";
import { COLORS } from "renderer/AppConstants";

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [starEmails, setStarEmails] = useState([]);
  const user = useSelector(selectUser)
  const [selected, setSelected] = useState("received");
  const getMails = async () => {
      try{let res= await Api.getReceivedMail(user?.accessToken)
      if(res.status==200){
        setEmails(res.data);
      }else {

      }}catch(e){
        console.log(e)
      }

  }
  const getStarMails = async () => {
      try{let res= await Api.getIsStarredMail(user?.accessToken)
      if(res.status==200){
        console.log(res.data)
        setStarEmails(res.data);
      }else {

      }}catch(e){
        console.log(e)
      }

  }
  const getSentMails = async () => {
      try{let res= await Api.getSentMail(user?.accessToken)
      if(res.status==200){
        setSentEmails(res.data);
      }else {

      }}catch(e){
        console.log(e)
      }

  }
  useEffect(()=>{
    if(emails.length === 0 &&selected=="received"){
      getMails()
    }
  }, [selected]);
  useEffect(()=>{
   if(sentEmails.length === 0 && selected=="sent"){
      getSentMails()
    }
  }, [selected]);
  useEffect(()=>{
   if(starEmails.length === 0 && selected=="star"){
      getStarMails()
    }
  }, [selected]);

  return (
    <div className="emailList">
     <div className="emailList-settings">
        <div className="emailList-settingsLeft">
          {/* <Checkbox /> */}
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        {/* <div className="emailList-settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div> */}
      </div>
      <div className="emailList-sections">
        <Section onClick={()=>setSelected("received")} Icon={selected=="received"?InboxIcon:InboxOutlined} title="Inbox" color={selected=="received"?COLORS.primary:"#1A73E8"} selected={selected=="received"} />
        <Section onClick={()=>setSelected("sent")} Icon={selected=="sent"?PeopleIcon:PeopleOutlineOutlined} title="Sent" color={selected=="sent"?COLORS.primary:"#1A73E8"}  selected={selected=="sent"} />
        <Section onClick={()=>setSelected("star")} Icon={selected=="star"?Star:StarBorderOutlined} title="Stared" color={selected=="star"?COLORS.primary:"#1A73E8"}  selected={selected=="star"} />
      </div>

      <div className="emailList-list">
        {selected=="received"&&emails.reverse().map(({ id,  to, subject, description, time,isRead ,isStared,from,mailAttachment }:any) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            isRead={isRead}
            description={description}
            from={from}
            updateFunction={getMails}
            time={new Date(time).toUTCString()}
            isStared={isStared}
            mailAttachment={mailAttachment}
          />
        ))}
        {selected=="sent"&&sentEmails.reverse().map(({ id,  to, subject, description, time,isRead ,isStared ,from,mailAttachment }:any) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={description}
            isStared={isStared}
            isRead={isRead}
            from={from}
            updateFunction={getSentMails}
            time={new Date(time).toUTCString()}
            mailAttachment={mailAttachment}
          />
        ))}
        {selected=="star"&&starEmails.reverse().map(({ id,  to, subject, description, time,isRead ,isStared ,from,mailAttachment }:any) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={description}
            isStared={isStared}
            isRead={isRead}
            from={from}
            updateFunction={()=>{getStarMails();getMails()}}
            time={new Date(time).toUTCString()}
            mailAttachment={mailAttachment}
          />
        ))}
      </div>
    </div>
  );
}

export default EmailList;
