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
} from 'renderer/Components/layout';
import { RouteComponentProps } from 'react-router-dom';
import { COLORS, size } from 'renderer/AppConstants';
import { useSelector ,useDispatch} from 'react-redux';
import { Avatar, Box, Button } from '@mui/material';
import Popup from '../CreateProjectForm/Popup';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Icon from 'react-web-vector-icons';
import {GetDocument,SaveDocument} from 'renderer/Store/Actions/ProjectDocument.action';
import { AnyObject } from 'immer/dist/internal';

const defaultImage =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=35';

interface Props {
  ParentHistory?: RouteComponentProps['history'];
  sideBar?: string;
  history: RouteComponentProps['history'];
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

  const dispatch=useDispatch();

  React.useEffect(() => {
  console.log("document",document)

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
        onClick={() => {setOpenDropDown(openDropDown==section.sectionId?-1:section.sectionId)}}
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
          <H2>{section?.sectionName}</H2>
          <Icon name="down" font="AntDesign" color="#000" size={20} />
        </Row>
        <Col>
        {openDropDown==section?.sectionId&&section?.documents?.map((document:any,index:number)=>{
          return <Item
          document={document}
          index={index}
          openDropDown={openDropDown}
          sectionId={section.sectionId}
          />
        })}
        </Col>
      </Col>
      ))}

      <UploadDocumentForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <AddDocumentSections
        isOpen={isOpenSections}
        setIsOpen={setIsOpenSection}
      />



  </Container>);
}


const Item=({document,index,openDropDown,sectionId}:any)=>{
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
        <Icon name='text-document' font='Entypo' color='#000' size={30} />
        <H2>{document.documentName}</H2>
        <H2>{document.documentStatus}</H2>
        <H2>{document.documentVersion}</H2>
        <H2>{document.uploadBy}</H2>
        <H2>Download</H2>
        <H2>Preview Item</H2>

      </Row>)
}

interface uploadcomprops {
  isOpen: boolean;
  setIsOpen: any;
}
const documentFormAttribute = {
  documentName: '',
  documentDescription: '',
  documentFile: '',
  team: [] as any,
  documentStatus: '',
  uploadBy: '',
  projectId: '',
  documentVersion: '',
};
const DocumentSection = {
  sectionName: '',
  sectionDescription: '',
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

  return (
    <>
      {isOpen && (
        <Popup
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

const UploadDocumentForm = ({ isOpen, setIsOpen }: uploadcomprops) => {
  const togglePopup = () => {
    setDataModel(documentFormAttribute);
    setIsOpen(!isOpen);
  };
  const MemberSelect = (item: any) => ({
    value: item.id,
    label: item.name,
    color: '#aeeeee',
    isFixed: true,
    isDisabled: false,
  });
  const animatedComponents = makeAnimated();
  const Members = useSelector(({ Members }: any) =>
    Members.data.map((item: any) => MemberSelect(item))
  );
  const [dataModel, setDataModel] = React.useState(documentFormAttribute);
  const onNameChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentName: event.target.value });
  };
  const onDocumentDescriptionChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentDescription: event.target.value });
  };
  const onDocumentFileChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentFile: event.target.value });
  };

  const onDocumentStatusChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentStatus: event.target.value });
  };
  const onDocumentVersionChangeHandle = (event: any) => {
    setDataModel({ ...dataModel, documentVersion: event.target.value });
  };

  return (
    <>
      {isOpen && (
        <Popup
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
                    value={dataModel.documentFile}
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
                    <option value="">Document Status</option>
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
                    style={{
                      padding: 20,
                      fontSize: 16,
                      textTransform: 'unset',
                    }}
                  >
                    Next
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

