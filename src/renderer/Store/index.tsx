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
    // ProjectSchdule:ProjectSchdule,
  }),
  applyMiddleware(...middleware)
);
return store;
}

export default ConfigureStore;



