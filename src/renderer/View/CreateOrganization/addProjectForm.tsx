import { flexbox, maxHeight } from '@mui/system';
import React,{useState} from 'react';
import InputButton from 'renderer/Components/InputButton';
import Popup from './Popup';
import {projectDataModel} from './DataModel';
import {useSelector} from "react-redux";
import Api from "renderer/Api/auth.api"

function AddProjectForm({isOpen,setIsOpen}:any) {


  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const user = useSelector(({auth}:any)=>auth.user);
  const [dataModel,setDataModel] = useState(projectDataModel);
  const onTitileChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"ProjectTitle":event.target.value});
  }
  const onDescriptionChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"projectDescription":event.target.value});
  }
  const onStartDateChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"startDate":event.target.value});
  }
  const onEndDateChangeHandle=(event:any)=>{
    setDataModel({...dataModel,"endDate":event.target.value});
  }
  return (<>{isOpen && <Popup handleClose={togglePopup}

      content={<>
        <div style={{display:'flex'}}><b>Create New Project</b></div>
        <form>
          <div style={{display:'flex',flexDirection:'column'}}>

              <p>Project Title</p>
              <input className="form-control" onChange={onTitileChangeHandle} value={dataModel.ProjectTitle} type="text" placeholder="Project Title"name="ProjectTitle"/>


              <p>Project Description</p>
              <textarea className="form-control" onChange={onDescriptionChangeHandle} value={dataModel.projectDescription} style={{maxHeight:120,minWidth:80}} placeholder="Project Description"name="projectDescription"/>


              <p>Start Date</p>
              <input className="form-control"  onChange={onStartDateChangeHandle} value={dataModel.startDate} type="date" placeholder="Start Date"name="startDate"/>


              <p>End Date</p>
              <input className="form-control" onChange={onEndDateChangeHandle} value={dataModel.endDate}  type="date" placeholder="End Date"name="endDate"/>


          </div>
        </form>
        <div className="View-Profile-Button" style={{display:'flex',justifyContent:'center'}}>
            {/* <button>Submit</button> */}
            <InputButton
              onClick={()=>{

                const dataa={
                  "ProjectTitle":dataModel.ProjectTitle,
                  "projectDescription":dataModel.projectDescription,
                  "status":"On Track",
                  "company":user.company,
                  "startDate":dataModel.startDate,
                  "endDate":dataModel.endDate,


              }
                // setDataModel({...dataModel,"company":user.company});
                Api.CreateProject(dataa,user.accessToken).then(res=>{
                  debugger;
                  if(res.data.status==200){
                    alert(res.data.message);
                    togglePopup();
                   setDataModel({...projectDataModel});

                  }
                  else{
                    alert(res.data.message);
                  }
                }
              ).catch(err=>{
                debugger;
                  alert(err.response.data.message);
              })

            }}
                    className="View-Button"
                    buttonStyle={{margin:20}}
                    title="Create Project"
                  />

        </div>


      </>}

    />}</>
 )
}

export default AddProjectForm;
