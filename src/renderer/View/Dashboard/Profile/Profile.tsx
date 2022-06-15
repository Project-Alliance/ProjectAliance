/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useSelector } from "react-redux";
import Icon from "react-web-vector-icons";
import {

  AUTH,
} from '../../../../Types/User.types';
import {
  Container,
  Row,
  Col,
} from 'renderer/Components/layout';
import { Button, CircularProgress } from '@mui/material';
import "./profile.css"
import Api from 'renderer/Api/auth.api';
import {Notification} from 'renderer/Util/Notification/Notify';
type inputData={
  name:string,
  Email:string,
  phone:string,
  ProfilePicture:any
}

export default function Profile() {

  const User = useSelector(({ auth }: AUTH) => auth.user);

  const [error, setError] = React.useState({ message: '', status: false });
  const [loader, setLoader] = React.useState(false);
  const user = useSelector(({auth}: any) => auth.user);
  const [inputData, setInputdata] = React.useState<inputData>({
    name: User.name,
    Email: User.email,
    phone: User.phone,
    ProfilePicture: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    let data = { ...inputData , [name]: value };
    setInputdata(data);
  };

  const handleChangePic = (event: any) => {
    setInputdata({...inputData,ProfilePicture:event?.target?.files[0]})
  };

  const validateData = () => {

    const nameExpression = /^[a-zA-Z ]{3,30}$/;
    const EmailExpression = /^\w{3,}.[a-z]{3,}.[a-z]{3,}$/g;
    // const userNameExpression = /^[a-zA-Z0-9]{3,30}$/g;

    if (!inputData.name.match(nameExpression)) {
      setError({ message: 'Name is required', status: false });
      return false;
    } else if (!inputData.Email.match(EmailExpression)) {
      setError({ message: 'Email is required', status: false });
      return false;
    } else if (inputData.phone == '') {
      setError({ message: 'phone no is required', status: false });
      return false;
    } else if (inputData.ProfilePicture.length==0) {
      setError({ message: 'Profile Image is required', status: false });
      return false;
    }

    setError({ message: '', status: false });
    return true;
  };

  //Update Profile api call
  const UpdateProfileData =async () => {
    if (validateData()) {
      setLoader(true);
      // const data = {
      //   name: inputData.name,
      //   email: inputData.Email,
      //   phone: inputData.phone,
      //   profilePic: inputData.profilePic,
      // };
  
      var data = new FormData();
      data.append('name', inputData.name);
      data.append('email', inputData.Email);
      data.append('phone', inputData.phone);
      data.append('ProfilePicture', inputData.ProfilePicture);

      console.log("nfsdfnmfnsdf",data);

      try{
        debugger;
        const response = await Api.updateProfile(user.userName, data, user.accessToken);
        if (response.status == 200) {
          setLoader(false);
          alert('Profile Updated Successfully');
      }
      } catch(err:any) {
        debugger;
        console.log(err);
        if(err) {
          setLoader(false);
          Notification('error',err.message , "danger");
          return false;
        }else if(err.response.status === 400) {
          setLoader(false);
          alert('Profile Update Failed');
          return false;
        }else if(err.response.status === 500) {
          setLoader(false);
          alert('Profile Update Failed');
          return false;
        }else if(err.response.status === 404) {
          setLoader(false);
          alert('Profile Update Failed');
          return false;
        }
      }
    }
  }


  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflowY:"scroll",
        position: 'relative',
      }} >
    <div className="parent">
    <div className="box-one">

      <h1 style={{color:'#fff'}} className="h1a">
        Hi,<br />
        I’m{"  "}
        <span className="color-secondary">{"  "+user.name}
        </span>
        <br />
        I,m {"  "}a {"  "}<span className="color-secondary">{"  "}Full-Stack Developer{"  "}</span>, at{"  "}
        <a className="color-secondary" target="_blank" href="http://jsdevs.dev">{user.company}</a>
      </h1>

      <div>
      <h1 style={{color:'#fff',marginTop:51}} className="h1a">User Name: {" "} <span className="color-secondary" style={{marginLeft:20}}>{user.userName}</span> </h1>
         <h1 style={{color:'#fff',marginTop:10}} className="h1a">Email: {" "} <span className="color-secondary" style={{marginLeft:80}}>{user.email}</span> </h1>
         <h1 style={{color:'#fff',marginTop:10}} className="h1a">Phone: {" "} <span className="color-secondary" style={{marginLeft:70}}>{user.phone}</span> </h1>
      </div>
    </div>
    <div className="box-two">
      <div className="image" >
      <img className="imgTag" src={user.profilePic} />
      </div>
      <div className="Icons" style={{backgroundColor:'white', borderRadius:20,height:40,width:40,marginLeft:440, cursor:'pointer',position:'relative',top:-30}}> <Icon name="edit" font="Entypo" color="black" size={25} style={{marginTop:10,marginLeft:7}} /> </div>

    </div>
  </div>


  <div className="box-three">

    <div className="box-three-one">
    <Row style={{marginTop:40,marginLeft:190,marginBottom:50}}>
                  <Col>
                    <div
                      style={{
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: '#EBEBEB',
                        color: 'white',
                        width: 500,
                        height:50,
                        marginTop: 5,
                        backgroundColor:'#007FFF',
                        fontFamily:'EvilIcons',
                        borderRadius: 15,
                        display:'flex',
                        justifyContent:'center',
                        fontWeight:'bold',
                        fontSize:30
                      }}
                    >
                      UPDATE PROFILE
                    </div>
                  </Col>
      </Row>
      <form className="form-2" onSubmit={() => console.log("Profile Field")}>
            {/***1st***/}
            <Row className="LabelStyleP">
              <div style={{width:120}}>
                <Col className="LabelInputP">Name</Col>
              </div>
              <div>
                <Col style={{width:700}}>
                <input
                    type="text"
                    disabled={loader}
                    id="name"
                    className="inputStyle"
                    placeholder="Name"
                    value={inputData?.name}
                    name="name"
                    onChange={handleChange}
                  />
                 </Col>
              </div>
            </Row>
              {/***Button Field***/}
              {/* <p
                style={{
                  color: error.status ? 'green' : 'red',
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                {error.message}
              </p> */}

            {/***2nd***/}
            <Row className="LabelStyleP">
               <div style={{width:120}}>
                <Col className="LabelInputP">Email</Col>
               </div>
               <div>
                <Col style={{width:700}}>
                  <input
                    disabled={loader}
                    type="text"
                    id="logo"
                    className="inputStyle"
                    placeholder="Email"
                    value={inputData?.Email}
                    name="Email"
                    onChange={handleChange}
                  />
                </Col>
                </div>
            </Row>
            {/* <p
                style={{
                  color: error.status ? 'green' : 'red',
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                {error.message}
              </p> */}

              {/***3rd***/}
            <Row className="LabelStyleP">
              <div style={{width:120}}>
                <Col className="LabelInputP">Phone No.</Col>
              </div>
              <div>
              <Col style={{width:700}}>
                <input
                      disabled={loader}
                      type="text"
                      id="phone"
                      className="inputStyle"
                      placeholder="Phone Number"
                      value={inputData?.phone}
                      name="phone"
                      onChange={handleChange}
                    />
              </Col>
              </div>
            </Row>
            {/* <p
                style={{
                  color: error.status ? 'green' : 'red',
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                {error.message}
              </p> */}

            {/***4th***/}
            <Row className="LabelStyleP">
              <div style={{width:120}}>
                <Col className="LabelInputP">Profile Pic</Col>
              </div>
            <div>
              <Col style={{width:700}} >
                  <input
                    disabled={loader}
                    id="ProfilePicture"
                    type={'file'}
                    className="inputStyle "
                    placeholder="profile Pic"
                    name="ProfilePicture"
                    onChange={handleChangePic}
                  />
              </Col>
            </div>
            </Row>
            <p
                style={{
                  color: 'red',
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                {error.message}
              </p>

            <Row style={{marginTop:40,marginLeft:160,marginBottom:50}}>
              <Col>
                <Button
                  disabled={loader}
                  onClick={() => UpdateProfileData()}
                  className="UpdateButton"
                  style={{
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: '#EBEBEB',
                    color: '#000000',
                    width: 200,
                    marginTop: 5,
                    backgroundColor:'white',
                    borderRadius: 15,
                    fontWeight:'bold'
                  }}
                >
                  {loader ? <CircularProgress size={30} /> : 'Submit Profile Info'}
                </Button>
              </Col>
            </Row>
            {/* <p
                style={{
                  color: error.status ? 'green' : 'red',
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                {error.message}
              </p> */}
        </form>
      </div>
  </div>

  </div>
  )
}
