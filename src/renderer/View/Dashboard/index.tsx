import './index.scss';
import logo from '../../../../assets/PA.png';

import Icon from 'react-web-vector-icons';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from 'react-router-dom';
import Home from './Home';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'renderer/Store/Actions/auth.action';
import MyTask from './MyTask';
import SideBarButton from 'renderer/Components/SideBarButton';
import { useEffect, useRef, useState } from 'react';
import Projects from './Projects';
import { useWindowSize  } from 'renderer/Util/useWindowSize';
import {sideBarButtons} from './SideBarButtonsSetails';
import {getProjects,CreateProjects} from 'renderer/Store/Actions/Project.action';
import { AUTH } from 'Types/User.types';
import { getMembers } from 'renderer/Store/Actions/members.action';
import ReportingScreen from './Reporting';
import Inbox from 'renderer/Components/Chat Module';
import Requirements from './Requirements';
import DesignManagement from './DesignManagement';
import ProjectTeam from './ProjectTeam';
import Goals from './Goals';
// import AddMembers from '../CreateProjectForm/AddMembers';
import AddMemberRoute from '../CreateProjectForm/createOrganization';
import Settings from './Setting';
import Quality from './QualityManagement';
import Mailbox from '../Email/App';
import Profile from './Profile/Profile';

import Change from './ChangeManagment';
import HelpScreen from './HelpScreen/HelpScreen';


export default function index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [color, setColor] = useState('#000');
  const [btnName, setBtnName] = useState('/');
  const [displaySlide, setDisplaySlide] = useState('flex');
  const [width, height] = useWindowSize();
  const user = useSelector(({auth}:AUTH)=>auth.user);
  const sideBarButtons = useSelector(({SideBarButton}:any)=>SideBarButton);

  const ref = useRef();

  useEffect(() => {
    dispatch(getProjects(user.company,user.accessToken));
    dispatch(getMembers(user.company,user.accessToken));

  });

  const handleSlide = () => {if (displaySlide == 'flex') {setDisplaySlide('none');} else {setDisplaySlide('flex')}};
  useEffect(() => {width<=1200?setDisplaySlide('none'):setDisplaySlide('flex')} , [width]);

  return (
    <div  className="row-view">
      <Router>
        {/* side Bar start */}

        {displaySlide == 'none' && (
          <button
            style={{
              borderWidth: 0,
              position: 'absolute',
              top: 15,
              left: 10,
              backgroundColor: 'transparent',
              outline: 'none',
              zIndex:100,
            }}
            onClick={handleSlide}
          >
            <Icon font="FontAwesome" name="bars" size={15} color="#3399FF" />
          </button>
        )}
        <div style={{display: displaySlide}}    className="side-left">
          <div
            className="row-view pr-5 pl-5"
            style={{ justifyContent: 'space-between' }}
          >
            {/* logo and Text */}
            <div className="row-view " style={{ alignItems: 'center' }}>
              <div
                style={{
                  borderRadius: '50%',
                  background: '#3399FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 25,
                  width: 25,
                  display: 'flex',
                }}
              >
                <img src={logo} style={{ height: 15, width: 15 }} />
              </div>

              <div className="pa-logo">Project Alliance</div>
            </div>
            {/* Sidebar closing and opening button */}
            <button style={{ borderWidth: 0 }} onClick={handleSlide}>
              <Icon font="FontAwesome" name="bars" size={15} color="#3399FF" />
            </button>
          </div>
          {/* sisde Bar end  */}
          <div className="sepratorRight" style={{marginTop:10}} />

          {/* ADD LINKS TO DIFFERENT COMPONENT */}
          {sideBarButtons?.map((item:any, index:number) => {
           return (<>
           <SideBarButton
            icon={true}
            key={index+"__"+item.title}
            title={item.title}
            font={item.font}
            iconName={item.iconName}
            onClick={() => {
              setBtnName(item.to);
              if(item.to=="/"&&item.title=="Back")
              {
                dispatch({type:"HOME_SCREEN"})
                dispatch({type:"REMOVE_PROJECT"});
              }
            }}
            color={btnName ==  item.to ? '#fff' : '#000'}
            btnName={btnName}
            className={btnName == item.to ? 'active-btn active-color-text' : ''}
            to={item.to}
          />
          {item?.seprator && <><h6 style={{ paddingLeft: 10,fontSize:12 }}>others</h6>
          <div className="sepratorRight" style={{ marginTop: -5 }} /></>}
          </>)
          })}



        </div>

        <div className="main-container" style={{width:displaySlide=="none"?"100%":"85%"}}>
          <Switch>

            <Route path="/mytask" component={MyTask}  />
            <Route path="/Projects"  >
              <Projects ParentHistory={history} sideBar={displaySlide} />
              </Route>
              <Route path="/reporting"  >
              <ReportingScreen ParentHistory={history} history={history} sideBar={displaySlide} />
              </Route>
              <Route path="/design"  >
              <DesignManagement history={history} sideBar={displaySlide} />
              </Route>
              <Route path="/ManageTeam"  >
              <ProjectTeam history={history} sideBar={displaySlide} />
              </Route>
              <Route path="/requirements"  >
              <Requirements  history={history} sideBar={displaySlide} />
              </Route>
              <Route path="/Goals"  >
                <Goals ParentHistory={history}  sideBar={displaySlide} />
              </Route>
              <Route path="/quality"  >
                <Quality sideBar={displaySlide}  />
              </Route>

              <Route path="/mailbox"  >
                <Mailbox   />
              </Route>


              <Route path="/change"  >
                <Change sideBar={displaySlide}  />
              </Route>


              {/* <Route path="/inbox"  >
              <Inbox ParentHistory={history} sideBar={displaySlide} />
              </Route> */}

              <Route path="/addmembers">
                <AddMemberRoute />
              </Route>

               {/* <Route path="/inbox"  >


               {/* <Route path="/inbox"  >
               <Route path="/inbox"  >


              <Inbox ParentHistory={history} sideBar={displaySlide} />
              </Route> */}
              {/* <Route path="/setting"  >
                <div>
                <button
                    onClick={() => {
                      dispatch(logout());
                    }}>
                    logout
                  </button>
                </div>
              </Route> */}

            <Route path="/setting">
              <Settings />
            </Route>
            <Route path="/help">
              <HelpScreen />
            </Route>
            <Route path="/account">
              <Profile />
            </Route>

            <Route  exact>
            <Home ParentHistory={history} sideBar={displaySlide} />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}
