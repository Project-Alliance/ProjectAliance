import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'renderer/Components/Button';
import NeedAccount from 'renderer/Components/NeedAccount';
import { useForm ,SubmitHandler} from "react-hook-form";
import InputButton from 'renderer/Components/InputButton';
interface IFormInput {
  Email: string;
  Password: string;
  remindMe: number;
}
export default function SignIn() {
  const { register, handleSubmit }=useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  return (
    <div className="AuthContainer">
      {/* Cretae Accoutn Tag */}
      <NeedAccount />
      <div>
        <div className="SignText">Sign In</div>

        <Button
        icon={true}
          iconName="social-google"
          font="SimpleLineIcons"
          className="CusomtButtonTitle"
          buttonStyle={{
            backgroundImage: `linear-gradient(to right, #F9B035 0%, #F98C4E 53%, #F96767 100%)`,
            boxShadow: `3.994px 22.651px 57px  rgba(249, 103, 103, 0.259)`,
            color: '#FFFFFF',
          }}
          title=" Sign with Google"
          color="#FFFFFF"
        />

        <Button
        icon={true}
          buttonStyle={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#EBEBEB',
          }}
          iconName="facebook"
          font="Feather"
          className="CusomtButtonTitle"
          title=" Sign with Facebook"
        />

        <div className="textgray">Or sign in using your email address</div>

       <form onSubmit={handleSubmit(onSubmit)}>
       <Row style={{ marginTop: 10 }}>
          <Col className="LabelInput">Email</Col>
          <Col className="LabelInput">Password</Col>
        </Row>

        <Row style={{ marginTop: 10 }}>
          <Col>
            <input type="text" id="email" className="inputStyle"
            {...register("Email",)}
            />
          </Col>
          <Col>
            <input type="password"  id="Password" className="inputStyle"
            {...register("Password",)}
            />
          </Col>
        </Row>

        <div style={{ alignItems: 'center', display: 'flex', marginTop: 25 }}>
          <input
            className="CheckBox mr-1"
            type="checkbox"
            {...register("remindMe")}
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
            backgroundImage: ` linear-gradient(to right, #B543F1 0%, #BF3EC9 47%, #EE4086 100%)`,
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




