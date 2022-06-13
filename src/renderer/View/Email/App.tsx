import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SendMail from "./components/SendMail/SendMail";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";
import Login from "./components/Login/Login";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);

  return (
    <Router>
      {!user ? (
        <></>
      ) : (
        <div className="app" >
          <Header  SetSide={()=>setSidebarIsOpen(!sidebarIsOpen)}/>
          <div className="app-body">
            {sidebarIsOpen&&<Sidebar />}
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route exact>
                <EmailList />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
