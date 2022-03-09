import { createErrorReducer, createIsFetchingReducer } from './common';
import { combineReducers } from 'redux';




const MemberReducer = () => {
 const data = (state =[] , action:any) => {
debugger;
  const { type, members } = action;
  switch (type) {
    case 'GET_MEMBERS_INIT':
    case 'GET_MEMBERS_ERROR':
      return null;
    case 'GET_MEMBERS_SUCCESS':
      return members;

    default:
      return state;
 }
};

return combineReducers({
  data,
  isChecking: createIsFetchingReducer('GET_MEMBERS'),
  error: createErrorReducer('GET_MEMBERS'),
});
}

export default MemberReducer();
