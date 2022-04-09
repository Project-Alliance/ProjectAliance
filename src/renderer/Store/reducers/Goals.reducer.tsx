import { createErrorReducer, createIsFetchingReducer } from './common';
import { combineReducers } from 'redux';



const ProjectGoals = () => {

 const Goals = (state =[]  , action:any) => {

  const { type, goals } = action;
  switch (type) {
    case 'GET_GOALS_INIT':
    case 'GET_GOALS_ERROR':
      return [];
    case 'GET_GOALS_SUCCESS':
      return goals;
    default:
      return state;
 }
};

return combineReducers({
  Goals,
  isChecking: createIsFetchingReducer('CREATE_GOALS'),
  error: createErrorReducer('CREATE_GOALS'),
});
}

export default ProjectGoals();
