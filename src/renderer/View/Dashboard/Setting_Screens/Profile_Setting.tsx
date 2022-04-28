import * as React from 'react';
import {
  Container,
  Row,
  Col,
} from 'renderer/Components/layout';

import { Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from 'renderer/Store/Actions/auth.action';

const Profile = () => {

  const [error, setError] = React.useState({ message: '', status: false });
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();

  const validateData = () => {

    const nameExpression = /^[a-zA-Z ]{3,30}$/;
    const EmailExpression = /^\w{3,}.[a-z]{3,}.[a-z]{3,}$/g;
    const userNameExpression = /^[a-zA-Z0-9]{3,30}$/g;

    if (inputData.name == '') {
      setError({ message: 'Name is required', status: false });
      return false;
    } else if (inputData.Email == '') {
      setError({ message: 'Email is required', status: false });
      return false;
    } else if (inputData.userName == '') {
      setError({ message: 'UserName is required', status: false });
      return false;
    } else if (inputData.Password == '') {
      setError({ message: 'Password is required', status: false });
      return false;
    } else if (inputData.phone == '') {
      setError({ message: 'Phone is required', status: false });
      return false;
    } else if (inputData.company == '') {
      setError({ message: 'Company is required', status: false });
      return false;
    } else if (inputData.role == '') {
      setError({ message: 'Role is required', status: false });
      return false;
    } else if (!inputData.name.match(nameExpression)) {
      setError({ message: 'Name is not valid', status: false });
      return false;
    } else if (!inputData.Email.match(EmailExpression)) {
      setError({ message: 'Email is not valid', status: false });
      return false;
    } else if (!inputData.userName.match(userNameExpression)) {
      setError({ message: 'UserName is not valid', status: false });
      return false;
    } else if (inputData.Password.length <= 8) {
      setError({ message: 'Password is not valid', status: false });
      return false;
    }

    setError({ message: '', status: false });
    return true;
  };

  const [inputData, setInputdata] = React.useState({
    name: '',
    Email: '',
    userName: '',
    Password: '',
    phone: '',
    company: '',
    role: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    let data = { ...inputData, [name]: value };
    setInputdata(data);
  };


  return (
    <Container style={{marginLeft:60}}>
       <Row style={{marginLeft:70,height:50}}>
         <h6>Update Your Profile</h6>
      </Row>
       <Row style={{flexDirection:'row',marginLeft:50,height:50}}>
         <Col style={{cursor:'pointer',height:50}}>
         <img
              style={{ height: 60, width: 60,border:2,borderRadius:30,backgroundColor:'#3399ff' }}
              src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
              alt="firebase"
            />
         </Col>
         <Col style={{marginLeft:30,marginTop:5}}>
          <Row style={{color:'blue',fontSize:16,cursor:'pointer',height:50}}>
            <u>Upload Your Photo</u>
          </Row>
          <Row>
             Photo wil help you recongnize you in this project.
          </Row>
         </Col>
       </Row>

       <form className="form-2" onSubmit={() => console.log("Profile Field")}>
        {/***1st***/}
        <Row className="LabelStyle">
          <Col className="LabelInput">Member Name</Col>
        </Row>
        <Row>
          <Col style={{width:400}}>
          <input
              type="text"
              disabled={loader}
              id="userName"
              className="inputStyle"
              placeholder="userName"
              value={inputData?.userName}
              name="userName"
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/***3rd***/}
        <Row className="LabelStyle">
          <Col className="LabelInput">Email</Col>
        </Row>
        <Row style={{ marginTop: 5 }}>
          <Col style={{width:400}}>
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
        </Row>
        <Row className="LabelStyle">
          <Col className="LabelInput">Role</Col>
        </Row>
        <Row style={{ marginTop: 5 }}>
          <Col style={{width:400}}>
            <select
              disabled={loader}
              name="role"
              className="inputStyle"
              onChange={handleChange}
              value={inputData?.role}
            >
              <option value="">Select Role</option>
              <option value="Moderator">Moderator</option>
              <option value="Member">Member</option>
            </select>
          </Col>
        </Row>

        {/***4th***/}
        <Row className="LabelStyle">
          <Col className="LabelInput">Password</Col>
        </Row>
        <Row style={{ marginTop: 5 }}>
          <Col style={{width:400}} >
            <div>
              <input
                disabled={loader}
                id="Password"
                type={'text'}
                className="inputStyle "
                placeholder="Password"
                name="Password"
                value={inputData?.Password}
                onChange={handleChange}
              />

            </div>
          </Col>
        </Row>

        {/***Button Field***/}
        <p
          style={{
            color: error.status ? 'green' : 'red',
            fontSize: 20,
            marginTop: 10,
          }}
        >
          {error.message}
        </p>
        <Row className="button-Style">
          <Col>
            <Button
              disabled={loader}
              // onClick={() => CreateUser()}
              className="ButtonStyle btn Create-Button"
              style={{
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#EBEBEB',
                color: '#000000',
                width: 200,
                marginTop: 5,
                borderRadius: 15,
              }}
            >
              {loader ? <CircularProgress size={30} /> : 'Update Profile'}
            </Button>
          </Col>
        </Row>

        <Row className="button-Style">
          <Col>
            <Button
              disabled={loader}
              // onClick={() => CreateUser()}
              onClick={() => {
                dispatch(logout());
              }}
              className="ButtonStyle btn Create-Button"
              style={{
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#EBEBEB',
                color: '#000000',
                width: 200,
                marginTop: 5,
                borderRadius: 15,
              }}
            >
              {loader ? <CircularProgress size={30} /> : 'Logout'}
            </Button>
          </Col>

        </Row>

      </form>


    </Container>

  );
}

export default Profile;
