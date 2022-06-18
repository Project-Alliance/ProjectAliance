import PropTypes from "prop-types"
import React, { useState } from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { selectUser } from "../../features/userSlice";
import Api from "renderer/Api/auth.api"
import {Notification} from "renderer/Util/Notification/Notify";
import Icon from "react-web-vector-icons";
import PreviewFile from 'react-file-viewer'
import Popup from "renderer/View/CreateProjectForm/Popup";
import {Form} from 'react-bootstrap'
import {Checkbox} from "@mui/material"



type previewFileType={
  'extension':string,
  'name':string,
  'URL':string,
  'preview':boolean
}
const preview={
  'extension':'docx',
  'name':'test',
  'URL':'https://www.google.com/',
  'preview':false
}
let mailDataModel={
  subject:"",
  title:"",
  description:"",
  to:"",
  ToList:[] as any,
  from:"",
  company:"",
  mailAttachment:[] as any,

}
function SendMail() {
  const [mailData, setMailData] = React.useState(mailDataModel);
  const [previewFile, setPreviewFile] = React.useState<previewFileType>(preview);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const user = useSelector(selectUser)
  const Members = useSelector(({ Members }: any) => Members.data);

  const onSubmit = () => {
    if(mailData.ToList.length==0)
    {
      Notification("Please Enter email address","sent to","danger");
      return
    }
    var data = new FormData();
    data.append('subject', mailData.subject);
    data.append('title', mailData.title);
    data.append('description', mailData.description);
    mailData.ToList.forEach((item:any)=>{
      data.append('ToList', item);
    })
    data.append('from', user.userName);

    data.append('company', user.company);
    for(let i =0;i<mailData.mailAttachment.length;i++){
      data.append('mailAttachment', mailData.mailAttachment[i]);
    }
    Api.sendMail(data,user?.accessToken).then((res:any)=>{
      Notification("Mail Sent Successfully","Mail sent to","success")
      dispatch(closeSendMessage());
    }).catch((err:any)=>{
      Notification("Mail Sent Failed","Mail sent to","danger")
    })


  };

  const returnAttachment=(length:number)=>{
    let files = mailData.mailAttachment;
    let fileArray = [];

    for(let i=0;i<length;i++){
      fileArray.push(files[i]);
    }
    return fileArray;
  }

  return (
   <>
   <SelectSpecific isOpen={isOpen} setIsOpen={setIsOpen} Members={Members} SetMembersMail={(mail:any)=>{setMailData({...mailData,ToList:mail})}} />
    <div className="sendMail">
      <div className="sendMail-header">
        <h3>New Mail</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail-close"
        />
      </div>

      <form><input
          placeholder="To"
          type="email"
          value={mailData.ToList.join(",")}
          onChange={(e) => {setMailData({...mailData,ToList:e.target.value.split(",")})}}
          name="to"
        />
        <div style={{flexDirection:'row',display:'flex',backgroundColor:"#fff"}}>

        <div style={{flexDirection:'row',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:10}}>
        <input
          type={"radio"}
          name="cc"
          style={{height:25,width:25,marginRight:10}}
          onChange={(e) => {
            if(e.target.checked)
            {
              let toList = Members.map((item:any)=>item.userName)
              setMailData({...mailData,ToList:[...toList]})

            }
            // else {
            //   let tolist = mailData.ToList.filter((item:any)=>!Members.map((item:any)=>item.userName).includes(item))
            //   setMailData({...mailData,ToList:tolist})

            // }
          }}
        />
        Send TO All Members
        </div>

        <div style={{flexDirection:'row',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:10}}>
        <input
          type={"radio"}
          name="cc"
          style={{height:25,width:25,marginRight:10}}
          onChange={(e) => {
            if(e.target.checked)
            {
              let toList = Members.filter((item:any)=>item.role=="Moderator").map((item:any)=>item.userName)
              setMailData({...mailData,ToList:[...toList]})

            }
            // else {

            //   let tolist = mailData.ToList?.filter((item:any)=>!Members.filter((item:any)=>item.role=="Moderator").map((item:any)=>item.userName).includes(item))
            //   setMailData({...mailData,ToList:tolist})

            // }
          }}
        />
        <label>Send to Moderators</label>
        </div>
      <div style={{flexDirection:'row',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:10}}>
        <input
          type={"Radio"}
          name="cc"
          style={{height:25,width:25,marginRight:10}}

          onChange={(e) => {
            if(e.target.checked)
            {
              setIsOpen(true)

            }
            // else {

            //   let tolist = mailData.ToList?.filter((item:any)=>!Members.includes((i:any)=>i.userName==item))
            //   setMailData({...mailData,ToList:tolist})
            //   setSendToAllModerator(0)
            // }
          }}
        />
        Send to Specific
        </div>

        </div>
        <input

          placeholder="Subject"
          type="text"
          value={mailData.subject}
          onChange={(e) => {setMailData({...mailData,subject:e.target.value})}}
          name="subject"
        />

          <input

          placeholder="title"
          type="text"
          value={mailData.title}
          onChange={(e) => {setMailData({...mailData,title:e.target.value})}}
          name="title"
          />

       <div style={{background:"#fff"}} className={"sendMail-message"}>
       <textarea
        placeholder="Message"
        style={{width:"100%",height:200,border:"none",textAlign:"left",padding:10}}
        value={mailData.description}
        onChange={(e) => {setMailData({...mailData,description:e.target.value})}}
      />
      <div style={{display:'flex',flexDirection:'row',overflow:'hidden',overflowX:'scroll'}}>
      {mailData.mailAttachment.length>0&&returnAttachment(mailData.mailAttachment.length).map((item:any,index:any)=>{
        return(
          <div
          // onClick={()=>{setPreviewFile({name:item.name,preview:true,URL:item.path,extension:item.name.substring(item.name.lastIndexOf('.')+1)})}}
          style={{fontSize:9,marginLeft:10}}>
            <div className="box-shadow" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:10,height:80,width:80,borderRadius:20,background:'#fff'}}>
            {ReturnFileIcon(item.name.substring(item.name.lastIndexOf('.')+1))}

            </div>
            {item.name.substring(0,20)}
          </div>
        )
      })}
      </div>
       </div>

       <div style={{flexDirection:'row',display:"flex",color:'#fff'}}>
       <input type="file" id="imgid" style={{height:50,width:100}}
        onChange={(e) => {setMailData({...mailData,mailAttachment:e.target.files})}}
        multiple/>
        {mailData.mailAttachment.length>0&&mailData.mailAttachment.length + " files selected"}
       </div>
        <div className="sendMail-options">
          <Button

            onClick={onSubmit}
            variant="contained"
            color="primary"
            className="sendMail-send"
          >
            Send
          </Button>
        </div>
      </form>
      {/* {previewFile.preview&&
        <Popup
        height={600}
        width={"65%"}
        handleClose={()=>{setPreviewFile({...previewFile,preview:false})}}
        content={
          <FileViewer
            fileType={previewFile.extension}
            filePath={previewFile.URL}
            onError={()=>setPreviewFile({...previewFile,preview:false})}/>
        }
        />} */}
    </div>
   </>
  );
}

export default SendMail;


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

  type selectSpecificProps={
    isOpen:boolean;
    setIsOpen:(value:boolean)=>void;
    SetMembersMail:(value:any)=>void;
    Members:any;

  }

const SelectSpecific=({isOpen,setIsOpen,Members,SetMembersMail}:selectSpecificProps)=>{
const [mail,setMails]= useState<any>([]);
const handleSubmit=(e:any)=>{
  e.preventDefault();
  SetMembersMail(mail);
  setIsOpen(false)
}
  return (
    <>
    {isOpen&&<Popup
    style={{zIndex:10000,}}
    boxStyle={{overflow:"hidden",overflowY:'scroll'}}
    handleClose={()=>setIsOpen(false)}
    content={<>
    <table>
      <thead>
        <tr>
          <th>
          <Checkbox
          style={{color:"#ffffff"}}
          checked={mail.length==Members.length}
          onChange={()=>{
            if(mail.length==Members.length){
              setMails([]);
            }
            else{
            setMails(Members.map((item:{userName:string})=>item.userName));
            }
          }}
          />
          </th>
          <th>
            Profile
          </th>
          <th>
            Name
          </th>
          <th>
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {Members.map((item:any)=>{
          return(
            <tr>
              <td>
              <Checkbox
              checked={mail.includes(item.userName)}
              onChange={()=>{
                if(mail.includes(item.userName)){
                  setMails(mail.filter((i:string)=>i!=item.userName));
                }
                else{
                  setMails([...mail,item.userName]);
                }
              }}

              />
              </td>
              <td>
                <img src={item.profilePic} style={{height:50,width:50,borderRadius:50,}} />
              </td>
              <td>
                {item.name}
              </td>
              <td>
                {item.userName}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <Button
      style={{
        padding: 20,
        fontSize: 16,
        textTransform: 'unset',
      }}
      title=""
      onClick={handleSubmit}
    >
      Send
    </Button>
    </>}

    />}
    </>
  )

}

SelectSpecific.propTypes = {
  Members: PropTypes.any,
  SetMembersMail: PropTypes.any,
  isOpen: PropTypes.any,
  setIsOpen: PropTypes.func
}
