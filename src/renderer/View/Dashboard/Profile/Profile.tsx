
import { useSelector } from "react-redux";
import "./profile.css"
export default function Profile() {
  const user = useSelector(({auth}: any) => auth.user);
  return (
    <div className="parent">
    <div className="box-one">
      <h1 style={{color:'#fff'}} className="h1a">
        Hi,<br />
        I’m{"  "}
        <span className="color-secondary">{"  "+user.name}
        </span>
        <br />
        I,m {"  "}a {"  "}<span className="color-secondary">{"  "}Web Developer{"  "}</span>, at{"  "}
        <a className="color-secondary" target="_blank" href="http://jsdevs.dev">{user.company}</a>
      </h1>
      <div style={{marginTop:50}}>
      <a className="contact-link" target="_blank" href="https://www.instagram.com/akhtar_sheraliat/"> Contact Me</a> </div>
    </div>
    <div className="box-two">
      <div className="image" >
      <img className="imgTag" src="https://s.cdpn.io/profiles/user/1206184/512.jpg?1568477798" />
      </div>
    </div>
  </div>
  )
}
