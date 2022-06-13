import { Button, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-web-vector-icons';
import Api from 'renderer/Api/auth.api';
import { COLORS } from 'renderer/AppConstants';
import InputButton from 'renderer/Components/InputButton';
import { H1 } from 'renderer/Components/layout';
import DropDownMenuSelect from 'renderer/Components/DropDownMenue';
import {
  EnvOptions,
  TestPlanOptions,
  TestCaseResultOptions,
} from './SideBarButtonsSetails';
import FileViewer from 'react-file-viewer';
import Popup from '../CreateProjectForm/Popup';


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
export default function QualityResult() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const [isOpenT, setIsOpenT] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);

  const [testPlanId, setTestPlanId] = useState(0);

  const [testCaeId, setTestCaeId] = useState(0);
  const [testCaseDisply, setTestCasesDisply] = useState(true);

  const [envId, setEnvId] = useState(0);

  const [simpleTestCase, setsimpleTestCase] = useState([]);
  const [RequirementBased, setRequirementBased] = useState([]);
  const user = useSelector(({ auth }: any) => auth.user);

  const [previewFile, setPreviewFile] = React.useState<previewFileType>(preview);


  const DefaultProject = useSelector(
    ({ SelectedProject }: any) => SelectedProject
  );
  const GetTestCase = async () => {
    let data = await Api.getTestCases(DefaultProject.pid, user?.accessToken);
    if (data.status) {
      console.log(data.data)
      setsimpleTestCase(data.data);
    }
  };
  const GetRequirementBasedTestCase = async () => {
    debugger;
    let data = await Api.getRequirementBasedTestCases(
      DefaultProject.pid,
      user?.accessToken
    );
    if (data.status) {

      setRequirementBased(data.data);
    }
  };
  useEffect(() => {
    if (simpleTestCase.length <= 0) {
      GetTestCase();
    }
  }, []);
  useEffect(() => {
    if (RequirementBased.length <= 0) {
      GetRequirementBasedTestCase();
    }
  }, []);
  return (
    <div className="Main_Task_List" style={{ padding: 20 }}>

      <InputButton
        onClick={() => {
          setTestCasesDisply(true);
        }}
        className="Create-Button btn"
        buttonStyle={{
          color: testCaseDisply ? COLORS.primary : COLORS.black,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'unset',
        }}
        title="Test Cases"
      />
      <InputButton
        onClick={() => {
          setTestCasesDisply(false);
        }}
        className="Create-Button btn"
        buttonStyle={{
          color: !testCaseDisply ? COLORS.primary : COLORS.black,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'unset',
        }}
        title="Requirement Based Test Cases"
      />
      {testCaseDisply && (
        <>
          <table>
            <thead className="table__heading ">
              <tr className="table__row">
                <th>Sr. No</th>
                <th>Test Cases</th>
                <th>Category Type</th>
                <th>Category Name</th>
                <th>Test Case Description</th>
                <th>Expected Outcome</th>
                <th>Test Outcome</th>
              </tr>
            </thead>
            <tbody className="table__content">
              {simpleTestCase.length > 0 ? (
                simpleTestCase.map((item: any, index: number) => (
                  <>
                    {item?.plans.map((testPlan: any, planIndex: number) => (
                      <>
                        {testPlan?.testCases.map(
                          (testCase: any, caseIndex: number) => (
                            <>
                              <tr className="table__row">
                                <td>{caseIndex+1}</td>
                                <td style={{ color: COLORS.success }}>
                                  {testCase?.name}
                                </td>

                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryType}
                                </td>
                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryName}
                                </td>
                                <td colSpan={3}></td>
                                </tr>

                              {
                                testCase.testResult.map((res:any,resIndex:any)=>{
                                  return(
                                    <>
                                    <tr>
                                    <td colSpan={4}></td>
                                   <td>{res.description}</td>
                                   <td>
                                      {res.expectedOutcome.map((expectedOutcome:any)=><><button onClick={()=>setPreviewFile({preview:true,URL:expectedOutcome.attachmentPath,extension:expectedOutcome.attachmentExtension.substring(1),name:expectedOutcome.name})} className="btn btn-outline-info">expectedOutcome</button><br/></>)}
                                   </td>
                                   <td>
                                      {res.testOutCome.map((testOutCome:any)=><><button onClick={()=>setPreviewFile({preview:true,URL:testOutCome.attachmentPath,extension:testOutCome.attachmentExtension.substring(1),name:testOutCome.name})} className="btn btn-outline-info">testOutCome</button><br/></>)}
                                   </td>
                                   </tr>
                                    </>
                                  )
                                })
                              }

                            </>
                          )
                        )}
                      </>
                    ))}
                  </>
                ))
              ) :null}
            </tbody>
          </table>
        </>
      )}

{!testCaseDisply && (
        <>
          <table>
            <thead className="table__heading ">
              <tr className="table__row">
                <th>Sr. No</th>
                <th>Test Cases</th>
                <th>Category Type</th>
                <th>Category Name</th>
                <th>Test Case Description</th>
                <th>Expected Outcome</th>
                <th>Test Outcome</th>
              </tr>
            </thead>
            <tbody className="table__content">
              {RequirementBased.length > 0 ? (
                RequirementBased.map((item: any, index: number) => (
                  <>
                    {item?.plans.map((testPlan: any, planIndex: number) => (
                      <>
                        {testPlan?.testCases.map(
                          (testCase: any, caseIndex: number) => (
                            <>
                              <tr className="table__row">
                                <td>{caseIndex+1}</td>
                                <td style={{ color: COLORS.success }}>
                                  {testCase?.name}
                                </td>

                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryType}
                                </td>
                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryName}
                                </td>
                                <td colSpan={3}></td>
                                </tr>

                              {
                                testCase.testResult.map((res:any,resIndex:any)=>{
                                  return(
                                    <>
                                    <tr>
                                    <td colSpan={4}></td>
                                   <td>{res.description}</td>
                                   <td>
                                      {res.expectedOutcome.map((expectedOutcome:any)=><><button onClick={()=>setPreviewFile({preview:true,URL:expectedOutcome.attachmentPath,extension:expectedOutcome.attachmentExtension.substring(1),name:expectedOutcome.name})} className="btn btn-outline-info">expectedOutcome</button><br/></>)}
                                   </td>
                                   <td>
                                      {res.testOutCome.map((testOutCome:any)=><><button onClick={()=>setPreviewFile({preview:true,URL:testOutCome.attachmentPath,extension:testOutCome.attachmentExtension.substring(1),name:testOutCome.name})} className="btn btn-outline-info">testOutCome</button><br/></>)}
                                   </td>
                                   </tr>
                                    </>
                                  )
                                })
                              }

                            </>
                          )
                        )}
                      </>
                    ))}
                  </>
                ))
              ) :null}
            </tbody>
          </table>
        </>
      )}
      {previewFile.preview&&
        <Popup
        height={600}
        width={"65%"}
        handleClose={()=>{setPreviewFile({...previewFile,preview:false})}}
        content={
          previewFile.extension=="doc"|| previewFile.extension=="docx"|| previewFile.extension=="png"|| previewFile.extension=="jpg"|| previewFile.extension=="jpeg"?
          <FileViewer
            fileType={previewFile.extension}
            filePath={previewFile.URL}
            onError={()=>setPreviewFile({...previewFile,preview:false})}/>
            :<a href={previewFile.URL} className="btn btn-outline-info" download={true} >Can not Preview Download it Now</a>
        }
        />}
    </div>
  );
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
