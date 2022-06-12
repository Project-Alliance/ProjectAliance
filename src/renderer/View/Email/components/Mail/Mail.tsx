import React from "react";
import "./Mail.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import PrintIcon from "@mui/icons-material/Print";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { selectOpenMail } from "../../features/mailSlice";
import { useSelector } from "react-redux";
import Api from "renderer/Api/auth.api";
import { selectUser } from "../../features/userSlice";
import {Notification} from 'renderer/Util/Notification/Notify'
import Icon from "react-web-vector-icons";
import FileViewer from 'react-file-viewer';


type mailAttachment={
  "id": number,
  "name": string,
  "emailId": number,
  "path": string,
  "ext": string,
  "fakeName": string
}

function Mail() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const selectedMail = useSelector(selectOpenMail);

  const deleteMail = async () => {
    try{let res= await Api.deleteMail(selectedMail.id,user?.accessToken)
    if(res.status==200){
      Notification("Mail deleted","Mail Deleted Successfully","success");
      history.push("/");
    }else {
      Notification("Error","Deletion Errod","danger");

    }}catch(e){
      console.log(e)
    }
}

const returnPrevieFiles=()=>{
  return selectedMail.mailAttachment.filter((item:any)=>{
    let ex=item.name.substring(item.name.lastIndexOf('.')+1);
    return ex=="doc"||ex=="docx"||ex=="png"||ex=="jpg"||ex=="jpeg";
  })
}

const returnNonPrevieFiles=()=>{
  return selectedMail.mailAttachment.filter((item:any)=>{
    let ex=item.name.substring(item.name.lastIndexOf('.')+1);
    return ex!="doc"||ex!="docx"||ex!="png"||ex!="jpg"||ex!="jpeg";
  })
}


  return (
    <div className="mail">
      <div className="mail-tools">
        <div className="mail-toolsLeft">
          <IconButton onClick={() => history.push("/")}>
            <ArrowBackIcon />
          </IconButton>

          {/* <IconButton>
            <MoveToInboxIcon />
          </IconButton>

          <IconButton>
            <ErrorIcon />
          </IconButton> */}

          <IconButton onClick={deleteMail}>
            <DeleteIcon />
          </IconButton>

          {/* <IconButton>
            <EmailIcon />
          </IconButton>

          <IconButton>
            <WatchLaterIcon />
          </IconButton>

          <IconButton>
            <CheckCircleIcon />
          </IconButton>

          <IconButton>
            <LabelImportantIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton> */}
        </div>
        {/* <div className="mail-toolsRight">
          <IconButton>
            <UnfoldMoreIcon />
          </IconButton>

          <IconButton>
            <PrintIcon />
          </IconButton>

          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </div> */}
      </div>
      <div className="mail-body">
        <div className="mail-bodyHeader">
          <div className="mail-subject">

            <h2>{selectedMail?.subject}</h2>
            <LabelImportantIcon className="mail-important" />
          </div>

          <p>{selectedMail?.title}</p>
          <p className="mail-time">{selectedMail?.time}</p>
        </div>
        <p>From {selectedMail?.from}</p>
        <div className="mail-message">
          <p>{selectedMail?.description}</p>
        </div>
        <div >
          {returnPrevieFiles().map((item:mailAttachment)=>{
            return(
            <div style={{borderWidth:5,borderColor:"#fa1231",borderStyle:"dashed",margin:10}}>
              <a style={{fontSize:10,height:40,width:100,background:"#fff"}} href={item.path} download={true}>Download </a>
                <FileViewer
                  fileType={item.name.substring(item.name.lastIndexOf('.')+1)}
                  filePath={item.path}
                  onError={()=>alert("pdf Error")}
                  />
              </div>

            )
          })}
      </div>
              {returnNonPrevieFiles().length>0&&<div style={{overflow:'hidden',overflowX:'scroll',display:'flex',flexDirection:'row'}}>
      {returnNonPrevieFiles().map((item:mailAttachment,index:any)=>{
        return(
          <div

          style={{fontSize:9,marginLeft:10}}>
            <div className="box-shadow" style={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:10,height:80,width:80,borderRadius:20,background:'#fff'}}>
            {ReturnFileIcon(item.name.substring(item.name.lastIndexOf('.')+1))}

            </div>
            {item.name.substring(0,20)}<br />
            <a style={{fontSize:10,height:40,width:100,background:"#fff"}} href={item.path} download={true}>Download </a>
          </div>
        )
      })}
              </div>}
      </div>
    </div>
  );
}

export default Mail;



const ReturnFileIcon=(fileExtension:any)=>{
  switch(fileExtension){
    case "pdf":
      return <Icon name='file-pdf-o' font='FontAwesome' color='#000' size={18} />
    case "doc":
      return <Icon name='file-word-o' font='FontAwesome' color='#000' size={18} />
    case "docx":
      return <Icon name='file-word-o' font='FontAwesome' color='#000' size={18} />
    case "xls":
      return <Icon name='file-excel-o' font='FontAwesome' color='#000' size={18} />
    case "xlsx":
      return <Icon name='file-excel-o' font='FontAwesome' color='#000' size={18} />
    case "ppt":
      return <Icon name='file-powerpoint-o' font='FontAwesome' color='#000' size={18} />
    case "pptx":
      return <Icon name='file-powerpoint-o' font='FontAwesome' color='#000' size={18} />
    case "jpg":
      return <Icon name='file-image-o' font='FontAwesome' color='#000' size={18} />
    case "jpeg":
      return <Icon name='file-image-o' font='FontAwesome' color='#000' size={18} />
    case "png":
      return <Icon name='file-image-o' font='FontAwesome' color='#000' size={18} />
    case "gif":
      return <Icon name='file-image-o' font='FontAwesome' color='#000' size={18} />
    case "bmp":
      return <Icon name='file-image-o' font='FontAwesome' color='#000' size={18} />
    case "zip":
      return <Icon name='file-zip-o' font='FontAwesome' color='#000' size={18} />
    case "rar":
      return <Icon name='file-zip-o' font='FontAwesome' color='#000' size={18} />
    case "txt":
      return <Icon name='file-text-o' font='FontAwesome' color='#000' size={18} />
    case "mp3":
      return <Icon name='file-audio-o' font='FontAwesome' color='#000' size={18} />
    case "mp4":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "avi":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "flv":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "wmv":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "mpg":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "mov":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "flv":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "3gp":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "mkv":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "mp2":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4a":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4v":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4p":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4b":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4r":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4v":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4p":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "m4b":
      return <Icon name='file-video-o' font='FontAwesome' color='#000' size={18} />
    case "exe":
      return <Icon name='file-code-o' font='FontAwesome' color='#000' size={18} />
    case "jar":
      return <Icon name='file-code-o' font='FontAwesome' color='#000' size={18} />
    case "bat":
      return <Icon name='file-code-o' font='FontAwesome' color='#000' size={18} />
    case "cmd":
      return <Icon name='file-code-o' font='FontAwesome' color='#000' size={18} />
    case "ps1":
      return <Icon name='file-code-o' font='FontAwesome' color='#000' size={18} />
    case "ps2":
      return <Icon name='file-code-o' font='FontAwesome' color='#000' size={18} />
    case "ps3":
      return <Icon name='file-code-o' font='FontAwesome' color='#000' size={18} />
      default:
        return <Icon name='file-o' font='FontAwesome' color='#000' size={18} />
  }
  }
