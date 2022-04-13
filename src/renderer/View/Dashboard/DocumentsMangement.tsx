import React from 'react';
import {
  Container,
  Header,
  ProjectIcon,
  Row,
  Col,
  H1,
  H2,
  Text,
  InputP,
  InputSelect
} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { COLORS, size } from 'renderer/AppConstants';
import { useSelector ,useDispatch} from 'react-redux';
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import Popup from '../CreateProjectForm/Popup';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Icon from 'react-web-vector-icons';
import {GetDocument,SaveDocument} from 'renderer/Store/Actions/ProjectDocument.action';
import Api from 'renderer/Api/auth.api';
import { Notification } from 'renderer/Util/Notification/Notify';
import Tooltip from '@mui/material/Tooltip';

import axios from 'axios';

// import { ipcRenderer } from 'electron';

import FileViewer from 'react-file-viewer';
// import { useTranslation } from 'react-i18next';
import {defaultImage} from 'renderer/Constant/Images';


interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
  history: RouteComponentProps['history'];
}
const preview={
  'extension':'docx',
  'name':'test',
  'URL':'https://www.google.com/',
  'preview':false
}
type previewFileType={
  'extension':string,
  'name':string,
  'URL':string,
  'preview':boolean
}
export default function DocumentManagement({ history, sideBar }: Props) {


// data required in header
  const projects = useSelector(({Project}: any) => Project?.data?.projects?Project?.data?.projects:[]);

  const user = useSelector(({ auth }: any) => auth.user);
  const selectedProject = useSelector(({SelectedProject}: any) => SelectedProject);
  const document = useSelector(({DocumentManager}: any) => DocumentManager);


  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenSections, setIsOpenSection] = React.useState(false);
  const [openDropDown, setOpenDropDown] = React.useState(-1);
  const [previewFile, setPreviewFile] = React.useState<previewFileType>(preview);
  const [sectionId, setSectionId] = React.useState<string>();

  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = (id:string) => {
    setIsOpen(true);
    setSectionId(id)
    setAnchorEl(null);
  };
  const handleDelete = (sid:number) => {
    debugger;
    Api.DeleteSection(sid,user?.accessToken).then(res=>{

      if(res.status===200){
        Notification("Sucess",'Section Deleted Successfully',"success");

      }else {
        Notification("Error",'Can not deleted',"danger");
      }
      dispatch(GetDocument(selectedProject?.pid,user?.accessToken));
    }).catch(err=>{
      Notification("Error",'Can not deleted',"danger");
    });
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (selectedProject?.pid) {
      dispatch(GetDocument(selectedProject.pid,user?.accessToken));
    }
  },[])


  return (
  <Container style={{overflowY:"scroll"}}>
    {/* Header Start  */}
    <Header style={{justifyContent:'space-between'}}>
      <Row>
      <ProjectIcon style={{borderRadius:10}}>
        <img style={{height:35,width:35}} src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase" />

      </ProjectIcon>
      <Col style={{marginLeft:5}}>
        <H2 style={{color:COLORS.primary}}>Document Management</H2>
        <Row style={{alignItems:'center'}}>
        <H1>{selectedProject?.projectTitle}</H1>



        </Row>
      </Col>

      </Row>
      <Row style={{justifyContent:'flex-end',alignItems:'center'}}>
        <input style={{width:200,marginRight:10,borderWidth:1,borderColor:COLORS.borderColor,borderRadius:20,height:30,padding:10, }} placeholder="Search" />
        <Avatar src={user?.profilePic?user?.profilePic:defaultImage} variant="circular" style={{marginRight:10}}/>
      </Row>
    </Header>
    {/* Header End */}

    <Row>
        <Button
          onClick={() => setIsOpenSection(true)}
          style={{
            fontSize: 12,
            margin: 10,
            color: COLORS.white,
            padding: 5,
            backgroundColor: COLORS.primary,
          }}
        >
          Create Sections
        </Button>
      </Row>

      {document?.map((section:any)=>(
        <Col>
        <Row
          style={{
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: COLORS.borderColor,
            height: 40,

            padding: 10,
            fontWeight: '600',
            justifyContent: 'space-between',
            alignItems:'center',

          }}
        >
          <H2 style={{fontSize:size.HeadingFont,width: '100%'}} onClick={() => {setOpenDropDown(openDropDown==section.sectionId?-1:section.sectionId)}}>
          {section?.sectionName}
          </H2>
          <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon name='dots-three-vertical' font="Entypo" color="#000" size={20} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>handleDelete(section.sectionId)}>Delete</MenuItem>
        <MenuItem onClick={()=>handleAdd(section.sectionId)}>Add Document</MenuItem>
      </Menu>
    </div>
        </Row>
        <Col>
        {openDropDown==section?.sectionId&&section?.documents?.map((document:any,index:number)=>{
          return (<>
          <Item
          document={document}
          index={index}
          openDropDown={openDropDown}
          sectionId={section.sectionId}
          previewFile={previewFile}
          setPreviewFile={setPreviewFile}
          />


          </>)
        })}
        </Col>
      </Col>
      ))}

      <UploadDocumentForm projectId={selectedProject?.pid} sectionId={sectionId} isOpen={isOpen} setIsOpen={setIsOpen} />
      <AddDocumentSections

        isOpen={isOpenSections}
        setIsOpen={setIsOpenSection}
      />
{previewFile.preview&&
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
        />}


  </Container>);
}

type itemType={
  document:any,
  index:number,
  openDropDown:number,
  sectionId:number,
  previewFile:previewFileType,
  setPreviewFile:any,
}


const Item=({document,index,openDropDown,sectionId,previewFile,setPreviewFile}:itemType)=>{

  const [dataModel, setDataModel] = React.useState<documentFormAttributeType>(document);
  const user=useSelector(({auth}:any)=>auth.user);
  const dispatch=useDispatch();
  const selectedProject = useSelector(({SelectedProject}: any) => SelectedProject);
  const onNameChangeHandle = (event: any) => {
    if(event.target.value!=document.documentName)
    {
      var data = {documentStatus:document.documentStatus,documentName:event.target.value};
      UpdateDocument(document.documentId,data,user?.accessToken);
    }

  };
  const onDocumentStatusChangeHandle = (event: any) => {
    if(event.target.value!=document.documentStatus)
    {
      var data = {documentStatus:event.target.value,documentName:document.documentName};
      UpdateDocument(document.documentId,data,user?.accessToken);
    }
  };
  const UpdateDocument=(documentId:number,document:any,accessToken:string)=>{
    Api.UpdateDocument(documentId,document,accessToken).then(res=>{
      if(res.status===200){
        dispatch(GetDocument(selectedProject?.pid,user?.accessToken));
        Notification("Sucess",'Document Updated Successfully',"success");
      }else {
        Notification("Error",'Can not updated',"warning");
      }}).catch(err=>{
        //console.log(err);
        Notification("Error",'Can not updated',"danger");
      });

    }

    const DeleteDocument=()=>{
      Api.DeleteDocument(document?.documentId,user?.accessToken).then(res=>{
        if(res.status===200){
          dispatch(GetDocument(selectedProject?.pid,user?.accessToken));
          Notification("Sucess",'Document Deleted Successfully',"success");
        }else {
          Notification("Error",'Can not deleted',"warning");
        }
      })
    }

      return(<Row
        className={openDropDown==sectionId?"animate__animated animate__fadeInRight":""}
        style={{
          height: 40,
          padding: 10,
          paddingLeft: 20,
          fontWeight: '300',
          justifyContent: 'space-between',
          alignItems:'center',
        }}
      >
        {ReturnFileIcon(document.documentFileExtension.substring(1))}
        <Tooltip title="Document Name">
        <InputP
        onBlur={onNameChangeHandle}
        defaultValue={document.documentName} />
        </Tooltip>
        <Tooltip title="Document Status">
        <InputSelect
        onChange={onDocumentStatusChangeHandle}
        defaultValue={document.documentStatus}>
          <option value="">Status</option>
          <option value="Draft">Draft</option>
          <option value="Approved">Approved</option>
        </InputSelect>
        </Tooltip>
        <Tooltip title="Document Version">
        <H2
        style={{fontSize:size.normalFont}}
        >
        {document.documentVersion}
        </H2>
        </Tooltip>
        <Tooltip title="Document Upload By">

        <H2 style={{fontSize:size.normalFont}}>{document.uploadBy}</H2>
        </Tooltip>
        <Tooltip title="Download Document">
        <a style={{fontSize:size.normalFont}} href={document.filePath} download={true}>Download </a>
        </Tooltip>
        <Tooltip title="Preview Document">
        <Button
        onClick={()=>{setPreviewFile({preview:true,URL:document.filePath,extension:document.documentFileExtension.substring(1)})}}
        >
        <Icon name='eye' font='Entypo' color={COLORS.blue} size={18} />
        </Button>
        </Tooltip>
        <Tooltip title="Delete Document">
        <Button
        onClick={DeleteDocument}>
          <Icon name='delete' font="AntDesign" color={COLORS.Rose} size={18} />
        </Button>
        </Tooltip>

      </Row>)
}
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
    default:
      return <Icon name='file-o' font='FontAwesome' color='#000' size={18} />
}
}

interface uploadcomprops {
  isOpen: boolean;
  setIsOpen: any;
  sectionId?:string;
  projectId?:string;
}
const documentFormAttribute = {
  documentName: '',
  documentDescription: '',
  documentFile: undefined,
  team: [],
  documentStatus: '',
  uploadBy: '',
  projectId: 0,
  sectionId: 0,
  documentVersion: '',
  fileName:""
};
type documentFormAttributeType = {
  documentName: string;
  documentDescription: string,
  documentFile: any,
  team: any,
  documentStatus: string,
  uploadBy: string,
  projectId: number,
  sectionId: number,
  documentVersion: string,
  fileName:string
};
const DocumentSection = {
  sectionName: '',
  sectionDescription: '',
  projectId: '',
};

const AddDocumentSections = ({ isOpen, setIsOpen }: uploadcomprops) => {
  const togglePopup = () => {
    setDataModel(DocumentSection);
    setIsOpen(!isOpen);
  };
  const MemberSelect = (item: any) => ({
    value: item.id,
    label: item.name,
    color: '#aeeeee',
    isFixed: true,
    isDisabled: false,
  });

  const Members = useSelector(({ Members }: any) =>
    Members.data.map((item: any) => MemberSelect(item))
  );
  const [dataModel, setDataModel] = React.useState(DocumentSection);
  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, sectionName: event.target.value });
  };
  const onDocumentDescriptionChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, sectionDescription: event.target.value });
  };
  // user
  const user = useSelector(({ auth }: any) => auth?.user);
  const selectedProject = useSelector(({SelectedProject}: any) => SelectedProject);
  const dispatch = useDispatch();

  const CreateSection=()=>{
    if(dataModel.sectionName.length==0){
      Notification('Error','Please enter Section Name',"danger");
      return;
    }
    let data=dataModel;
    data.projectId=selectedProject?.pid;
    Api.CreateDocumentSection(data,user?.accessToken).then((res:any)=>{
      debugger
      //console.log("res",res)
      if(res.status==200){
        dispatch(GetDocument(selectedProject?.pid,user?.accessToken));
        setDataModel(DocumentSection);
        setIsOpen(false);
        Notification('Success','Section Created Successfully',"success");
      }else{
        Notification('Error','Something went wrong',"danger");
      }
    }).catch((err:any)=>{
      Notification('Error','Something went wrong   '+err,"danger");
    })

  }

  return (
    <>
      {isOpen && (
        <Popup
        height={"auto"}

          handleClose={togglePopup}
          content={
            <>
              <Box
                style={{
                  display: 'flex',
                  color: COLORS.blue1['500'],
                  fontSize: 20,
                  marginLeft: 8,
                  marginBottom: 10,
                }}
              >
                Create Document Section
              </Box>

              <form>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onNameChangeHandle}
                    value={dataModel.sectionName}
                    type="text"
                    placeholder="Section Name"
                    name="sectionName"
                  />

                  <textarea
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      maxHeight: 120,
                      minWidth: 80,
                      fontSize: 12,
                    }}
                    onChange={onDocumentDescriptionChangeHandle}
                    value={dataModel.sectionDescription}
                    placeholder="Section Description"
                    name="sectionDescription"
                  />
                </div>
                <div
                  className="View-Profile-Button"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}
                >
                  <Button
                  onClick={CreateSection}
                    style={{
                      padding: 20,
                      fontSize: 16,
                      textTransform: 'unset',
                    }}
                  >
                    Create Section
                  </Button>
                </div>
              </form>
            </>
          }
        />
      )}
    </>
  );
};



const UploadDocumentForm = ({ isOpen, setIsOpen,sectionId,projectId }: uploadcomprops) => {

  const user = useSelector(({ auth }: any) => auth.user);
  const dispatch = useDispatch();
  const [dataModel, setDataModel] = React.useState<documentFormAttributeType>(documentFormAttribute);
  const togglePopup = () => {
    setDataModel(documentFormAttribute);
    setIsOpen(!isOpen);
  };

  const MemberSelect = (item: any) => ({
    value: item.userId,
    label: item.name,
    color: '#aeeeee',
    isFixed: true,
    isDisabled: false,
    role:item.role,
    email:item.email,
  });
  React.useEffect(()=>{
    Api.GetProjectteam(Number(projectId),user?.accessToken).then((res:any)=>{
      //console.log(res.data)
      if(res.status==200){
        let team=res.data.map((item:any)=>MemberSelect(item));
        setMembers(team);
      }
    }).catch((err:any)=>{})
  })
  const animatedComponents = makeAnimated();
  const [Members,setMembers] = React.useState<any>();



  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentName: event.target.value });
  };
  const onDocumentDescriptionChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentDescription: event.target.value });
  };

  const onDocumentFileChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentFile: event.target.files[0],fileName:event.target.files[0].name });
  };


  const onDocumentStatusChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentStatus: event.target.value });
  };
  const onDocumentVersionChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentVersion: event.target.value });
  };
  const SubmitDocument=async ()=>{
    if(dataModel.documentName.length==0){
      Notification('Error','Please enter Document Name',"danger");
      return;
    }
    else if(dataModel.documentDescription.length==0){
      Notification('Error','Please enter Document Description',"danger");
      return;
    }
    else if(dataModel.documentFile.length==0){
      Notification('Error','Please select Document File',"danger");
      return;
    }
    else if(dataModel.documentStatus.length==0){
      Notification('Error','Please select Document Status',"danger");
      return;
    }
    else if(dataModel.documentVersion.length==0){
      Notification('Error','Please enter Document Version',"danger");
      return;
    }
    else if(dataModel.team.length==0){
      Notification('Error','Please select Team',"danger");
      return;
    }
    else if(dataModel.projectId==null){
      Notification('Error','Please select Project',"danger");
      return;
    }
    else if(dataModel.documentFile.size>5000000){
      Notification('Error','Please select Document File less than 5 MB',"danger");
      return;
    }



        const FormData = global.FormData;
        const formData = new FormData();

        formData.append("documentName", dataModel.documentName);
        formData.append("documentDescription", dataModel.documentDescription);
        formData.append("file", dataModel.documentFile);
        formData.append("documentStatus", dataModel.documentStatus);
        formData.append("uploadBy", user.id);
        formData.append("documentVersion", dataModel.documentVersion);
        formData.append("sectionId", sectionId?sectionId:"");
        formData.append("projectId", projectId?projectId:"");



        try {


          const response = await axios.post("http://localhost:5000/api/Document/saveDocumentToDatabase",formData,{data: formData, headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'multipart/form-data',
            Authorization: 'Bearer ' + user?.accessToken,

          }})
            .then(response => {
              if(response.status==200)
              {
                setIsOpen(false);
                setDataModel(documentFormAttribute);
                dispatch(GetDocument(projectId?projectId:"0",user?.accessToken));
                Notification('Success','Document Uploaded Successfully',"success");
              }

            })
            .catch(error => {
              Notification('Error','Document Not Uploaded',"danger");
        })}
        catch (error) {}


  }







  return (
    <>
      {isOpen && (
        <Popup
        height={430}
          handleClose={togglePopup}
          content={
            <>
              <Box
                style={{
                  display: 'flex',
                  color: COLORS.blue1['500'],
                  fontSize: 20,
                  marginLeft: 8,
                  marginBottom: 10,
                }}
              >
                Upload Document
              </Box>

              <form>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onNameChangeHandle}
                    value={dataModel.documentName}
                    type="text"
                    placeholder="Document Name"
                    name="docName"
                  />
                  <input
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      height: 30,
                      fontSize: 12,
                    }}
                    onChange={onDocumentVersionChangeHandle}
                    value={dataModel.documentVersion}
                    type="text"
                    placeholder="Document Version"
                    name="documentVersion"
                  />
                  <input
                    className="form-control"
                    style={{ marginTop: 10, fontSize: 12 }}
                    onChange={onDocumentFileChangeHandle}
                    defaultValue={dataModel.fileName}
                    type="file"
                    placeholder="Document File"
                    name="documentFile"
                  />

                  <select
                    className="form-control"
                    style={{ marginTop: 10, fontSize: 12 }}
                    onChange={onDocumentStatusChangeHandle}
                    value={dataModel.documentStatus}
                    placeholder="Document Status"
                    name="documentStatus"
                  >
                    <option value="">Select Document Status</option>
                    <option value="Draft">Draft</option>
                    <option value="Approved">Approved</option>
                  </select>
                  <textarea
                    className="form-control"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      maxHeight: 120,
                      minWidth: 80,
                      fontSize: 12,
                    }}
                    onChange={onDocumentDescriptionChangeHandle}
                    value={dataModel.documentDescription}
                    placeholder="Docuement Description"
                    name="DocumentDescription"
                  />

                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="share With"
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        backgroundColor: 'white',
                        color: 'black',
                        borderColor: 'white',
                        marginTop: 10,
                        zIndex: 100,
                      }),
                    }}
                    isMulti
                    defaultValue={dataModel.team}
                    options={Members}
                    onChange={(value: any) => {
                      setDataModel({ ...dataModel, team: value });
                    }}
                  />
                </div>
                <div
                  className="View-Profile-Button"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}
                >
                  <Button

                  onClick={SubmitDocument}
                    style={{
                      padding: 20,
                      fontSize: 16,
                      textTransform: 'unset',
                    }}
                  >
                    Save Document
                  </Button>
                </div>
              </form>
            </>
          }
        />
      )}
    </>
  );
};

