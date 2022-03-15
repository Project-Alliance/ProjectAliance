import { createErrorReducer, createIsFetchingReducer } from './common';
import { combineReducers } from 'redux';




const ProjectReducer = () => {
 const data = (state =[] , action:any) => {

  const { type, projects } = action;
  switch (type) {
    case 'GET_PROJECTS_INIT':
    case 'GET_PROJECTS_ERROR':
      return [];
    case 'GET_PROJECTS_SUCCESS':
      return projects;

    default:
      return state;
 }
};

return combineReducers({
  data,
  isChecking: createIsFetchingReducer('GET_PROJECTS'),
  error: createErrorReducer('GET_PROJECTS'),
});
}

export default ProjectReducer();
