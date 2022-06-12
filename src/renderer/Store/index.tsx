import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import auth from "./reducers/auth.reducer";
import Organization from "./reducers/Organization.reducer";
import Project from './reducers/Project.reducer';
import Members from './reducers/Members.reducer';
import DocumentManager from './reducers/Document.Reducers';
import {SideBarButton} from "./reducers/SideBarReducers"
import {SelectedProject} from "./reducers/SelectedProjectReducers"
import ProjectGoals from "./reducers/Goals.reducer"
import ProjectSchdule from "./reducers/Schedule.reducer"
import mailReducer from "../View/Email/features/mailSlice"
import userSlice from "../View/Email/features/userSlice"






const ConfigureStore=()=>{
  const middleware = [thunk];

const store = createStore(
  combineReducers({
    auth,
    Project,
    SideBarButton,
    SelectedProject,
    DocumentManager,
    organization:Organization,
    Members:Members,
    ProjectGoals:ProjectGoals,
    mail: mailReducer,
    user: userSlice,
    // ProjectSchdule:ProjectSchdule,
  }),
  applyMiddleware(...middleware)
);
return store;
}

export default ConfigureStore;



