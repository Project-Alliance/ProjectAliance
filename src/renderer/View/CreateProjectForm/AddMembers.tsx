import { Col, Row, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Button from 'renderer/Components/Button';
import InputButton from 'renderer/Components/InputButton';
// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  auth,
  OrgIFormInput,
  IFormInput,
  AUTH,
} from '../../../Types/User.types';
import React from 'react';
import { CreateOrganization } from 'renderer/Store/Actions/Organization.action';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'renderer/Store/Actions/auth.action';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import CustomButton from 'renderer/Components/Button';
import Icon from 'react-web-vector-icons';
import PhoneInput from 'react-phone-input-2';
import { Button, CircularProgress } from '@mui/material';
import Api from 'renderer/Api/auth.api';

// import Genrator from 'generate-password'

interface org {
  organization: any;
  error: any;
  isChecking: boolean;
}

const AddMembers: any = withRouter(function ({ history }: any) {
  const dispatch = useDispatch();

  const User = useSelector(({ auth }: AUTH) => auth.user);
  const [error, setError] = React.useState({ message: '', status: false });
  const [loader, setLoader] = React.useState(false);
  const Organization = useSelector(({ organization }: org) => {
    return organization.organization;
  });
  const onSubmit = (Data: IFormInput) => {
    dispatch(CreateOrganization(Data, User.accessToken));
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
  const RedirectToDashBoard = () => {
    history.push('/dashboard');
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    let data = { ...inputData, [name]: value };
    setInputdata(data);
  };
  const genrateRandomPassword = () => {
    var chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    setInputdata({ ...inputData, Password: randomstring });
  };

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
  const CreateUser = async () => {
    setLoader(true);
    inputData.company = User.company;
    const IsValid = validateData();
    if (IsValid) {
      Api.AddMembers(inputData, User.accessToken)
        .then((result: any) => {
          setLoader(false);
          if (result.data.status == 200) {
            setInputdata({
              name: '',
              Email: '',
              userName: '',
              Password: '',
              phone: '',
              company: '',
              role: '',
            });
            setError({ message: 'Added Successfully', status: true });
          } else if ((result.message = 'Network Error')) {
            setError({ message: 'Network Error', status: false });
          }
        })
        .catch((err) => {
          setLoader(false);
          setError({ message: err.response.data, status: false });
        });
    } else {
      setLoader(false);
    }
  };
  return (
    <Container className="AuthContainer">
      {/* Headind Div */}

      {/* <div className="main-smallHeading">

          Please Enter your Organization Detail{' '}
        </div> */}
      {/*Select Project Div */}
      <form className="form-1" onSubmit={() => onSubmit(inputData)}>
        {/***1st***/}

        <div className="main-heading">Add Members</div>
        <Row className="LabelStyle">
          <Col className="LabelInput">Member Name</Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              disabled={loader}
              id="Name"
              value={inputData?.name}
              className="inputStyle"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/***2nd***/}
        <Row className="LabelStyle">
          <Col className="LabelInput">UserName</Col>
        </Row>
        <Row>
          <Col>
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
          <Col>
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
          <Col>
            <select
              disabled={loader}
              name="role"
              className="inputStyle"
              value={inputData?.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Moderator">Moderator</option>
              <option value="Member">Member</option>
            </select>
          </Col>
        </Row>
        <Row className="LabelStyle">
          <Col className="LabelInput">Phone</Col>
        </Row>
        <Row style={{ marginTop: 5 }}>
          <PhoneInput
            disabled={loader}
            country="us"
            value={inputData.phone}
            onChange={(phone) => setInputdata({ ...inputData, phone })}
            containerStyle={{ width: '95%', padding: 0, borderRadius: 10 }}
            containerClass="phoenInput"
            inputStyle={{
              border: 'none',
              width: '100%',
              backgroundColor: '#fff',
              borderStyle: 'none',
            }}
            buttonStyle={{ border: 'none' }}
          />
        </Row>

        {/***4th***/}
        <Row className="LabelStyle">
          <Col className="LabelInput">Password</Col>
        </Row>
        <Row style={{ marginTop: 5 }}>
          <Col>
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
              <button
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#fff',
                  borderWidth: 0,
                  position: 'relative',
                  right: 35,
                }}
                className="eye-icon"
                type="button"
                onClick={() => genrateRandomPassword()}
              >
                <Icon
                  name="ios-refresh"
                  font="Ionicons"
                  size={20}
                  color="#000"
                />
              </button>
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
              onClick={() => CreateUser()}
              className="ButtonStyle btn Create-Button"
              style={{
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#EBEBEB',
                color: '#000000',
                width: 200,
                marginTop: 30,
                borderRadius: 15,
              }}
            >
              {loader ? <CircularProgress size={30} /> : 'Add Members'}
            </Button>
          </Col>
          <Col>
            <CustomButton
              onClick={() => RedirectToDashBoard()}
              icon={false}
              className="Create-Button"
              buttonStyle={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#EBEBEB',
                color: '#000000',
                width: 200,
                marginTop: 30,
              }}
              title=" Skip"
            />
          </Col>
        </Row>
      </form>
    </Container>
  );
});

export default AddMembers;
