import { createErrorReducer, createIsFetchingReducer } from './common';
import { combineReducers } from 'redux';



const ProjectSchdule = () => {

 const Schdule = (state =[]  , action:any) => {

  const { type, schedule } = action;
  switch (type) {
    case 'GET_Schedule_INIT':
    case 'GET_Schedule_ERROR':
      return [];
    case 'GET_Schedule_SUCCESS':
      return schedule;
    default:
      return state;
 }
};

return combineReducers({
  Schdule,
  isChecking: createIsFetchingReducer('SCHEDULE_GOALS'),
  error: createErrorReducer('Schdule_GOALS'),
});
}

export default ProjectSchdule;
