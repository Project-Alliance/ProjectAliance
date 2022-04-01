import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import auth from "./reducers/auth.reducer";
import Organization from "./reducers/Organization.reducer";
import Project from './reducers/Project.reducer';
import Members from './reducers/Members.reducer';
import {SideBarButton} from "./reducers/SideBarReducers"
import {SelectedProject} from "./reducers/SelectedProjectReducers"






const ConfigureStore=()=>{
  const middleware = [thunk];

const store = createStore(
  combineReducers({
    auth,
    Project,
    SideBarButton,
    SelectedProject,
    organization:Organization,
    Members:Members
  }),
  applyMiddleware(...middleware)
);
return store;
}

export default ConfigureStore;



