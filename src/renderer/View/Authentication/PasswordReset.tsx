import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'renderer/Components/Button';
import NeedAccount from 'renderer/Components/NeedAccount';
import { useForm ,SubmitHandler} from "react-hook-form";
import InputButton from 'renderer/Components/InputButton';
import React from 'react';

import {IFormInput,
  AUTH
} from '../../../Types/User.types';
import {signin} from '../../Store/Actions/auth.action'
import { useDispatch,
  useSelector
 } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { blue } from 'renderer/AppConstants';
import { Notification } from 'renderer/Util/Notification/Notify';



export default function Password_Reset() {

  const dispatch=useDispatch();
  const ServerError=useSelector(({auth}:AUTH)=>{return auth.login?.error})

  const { register,formState: { errors }, handleSubmit }=useForm<IFormInput>({criteriaMode:'all'});
  const onSubmit: SubmitHandler<IFormInput> = Data => {

   dispatch(signin(Data))

  };


 React.useEffect(()=>{
   if(ServerError){
    Notification("Error",ServerError.message,"danger")
   }
   else if(errors.userName){
    Notification("Error",errors?.userName?.message||'',"danger")
   }
   else if(errors.password){
    Notification("Error",errors?.password?.message||'','danger')
   }
 },[errors])
 const isCheckingR = useSelector(({ auth }: AUTH) => {
  return auth.login?.isChecking;
});
if(isCheckingR)
{
  return(<Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isCheckingR}

  >
    <CircularProgress color="inherit" />
  </Backdrop>)
}
  return (
    <div className="AuthContainer">
      {/* Cretae Accoutn Tag */}
      <NeedAccount />
      <div>
        <div className="form-heading">Password Reset</div>


        <div className="textgray">Please Fill Up Both Fields to Reset Password</div>

       <form className="form-1" onSubmit={handleSubmit(onSubmit)}>
       <Row style={{ marginTop: 10 }}>
          <Col className="LabelInput">Password-I</Col>
          <Col className="LabelInput">Password-II</Col>
        </Row>

        <Row style={{ marginTop: 10 }}>
          <Col>
            <input type="text" id="email" className="inputStyle"
            placeholder="example@company.pa.com"
            {...register("userName", {
              required: "This input is required.",
              pattern: {
                value: /\w+@[a-zA-Z]+.pa.com/,
                message: "UserName is your company mail \n john@google.pa.com."
              }
            })}
            />
          </Col>
          <Col>
            <input type="password"  id="Password" className="inputStyle"
            {...register("password",
            {
              required: "This input is required.",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: "Password contain 1 alphabate and 1 numbers and minimum 8 Charcter."
              }
            }
            )}
            />
          </Col>
        </Row>


        <div style={{ alignItems: 'center', display: 'flex', marginTop: 25 }}>
          <input
            className="CheckBox mr-1"
            type="checkbox"
            {...register("rememberme")}
            id="flexCheckDefault"
          />
          <label
            className="form-check-label ml-1"
            style={{ marginLeft: 10, fontSize: 14, color: '#7A86A1',fontFamily:'Manrope' }}
            htmlFor="flexCheckDefault"
          >
            Remember me
          </label>
          <Link
            to="/ForgotPassword"
            className="ml-1 RegisterLink"
            style={{ marginLeft: 10 }}
          >
            Forgot password?
          </Link>
        </div>
        <InputButton

          buttonStyle={{
            backgroundImage: ` linear-gradient(to right, ${blue[200]} 0%, ${blue[500]} 47%, ${blue[700]} 100%)`,
            boxShadow: `3.994px 22.651px 57px rgba(97, 73, 205, 0.259)`,
            color: '#FFFFFF',
            width:300,marginTop:30
          }}
          title=" Sign In"

        />
       </form>



      </div>
    </div>
  );
}







