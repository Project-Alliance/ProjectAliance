/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';
import Api from 'renderer/Api/auth.api';
import NeedAccount from 'renderer/Components/NeedAccount';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';
import InputButton from 'renderer/Components/InputButton';
import {blue} from 'renderer/AppConstants';
// import { useSelector } from 'react-redux';
import { Notification } from 'renderer/Util/Notification/Notify';
// import {
//   AUTH,
// } from '../../../Types/User.types';

interface IFormInput {
  Email: string;
}
export default function FogotPassword() {
  // const { register, handleSubmit } = useForm<IFormInput>();
  // const onSubmit: SubmitHandler<IFormInput> = (data) =>{ console.log(data); };
  // const user = useSelector(({ auth }: AUTH) => auth.user);
  const [loader,setLoader] = React.useState(false);
  const[inputData,setInputData] = React.useState({email:""});

  const onEmailChange = (event: any) => {
    setInputData({ ...inputData, email: event.target.value });
  };


  const forgot_Password = async() =>{

  try{
     await Api.forgotPassword(inputData.email );
      Notification('success','Updated Password Successfully Sent on Email' , "success");
      setLoader(false);
  }
  catch(err:any){
    if(err) {
      Notification('error',err.message , "danger");
      return false;
    }
   }
  }

  return (
    <div className="AuthContainer">
      {/* Cretae Accoutn Tag */}
      <NeedAccount />
      <div>
        <div className="form-heading">Forgot password?</div>

        <div className="textgray">
          Enter the email address you used when you joined and we'll
          <br /> send you instructions to reset your password.
        </div>

        <form>
          <Row style={{ marginTop: 10 }}>
            <Col className="LabelInput">Your email</Col>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <Col>

              <input
                    className="inputStyle"
                    // style={{
                    //   marginTop: 10,
                    //   marginBottom: 10,
                    //   height: 30,
                    //   fontSize: 12,
                    // }}
                    onChange={onEmailChange}
                    value={inputData.email}
                    type="text"
                    placeholder="abc@company.pa.com"
                    name="email"
                  />
            </Col>
          </Row>

        </form>

        <Button
            disabled={loader}
            onClick={()=> forgot_Password()}
            className="ButtonStyle btn Create-Button"
            style={{
              backgroundImage: ` linear-gradient(to right, ${blue[200]} 0%, ${blue[500]} 47%, ${blue[700]} 100%)`,
              boxShadow: `3.994px 22.651px 57px rgba(97, 73, 205, 0.259)`,
              color: '#FFFFFF',
              width: 300,
              marginTop: 30,
            }}
          >
            {loader ? <CircularProgress size={30} /> : 'Submit'}
          </Button>

        <div style={{ alignItems: 'center', display: 'flex', marginTop: 25 }}>
          <Link to="/" className="ml-1 RegisterLink" style={{ marginLeft: 10 }}>
            <Icon
              name="chevron-small-left"
              color={blue[500]}
              size={20}
              font="Entypo"
            />{' '}
            Back to sig in
          </Link>
        </div>
      </div>
    </div>
  );
}
