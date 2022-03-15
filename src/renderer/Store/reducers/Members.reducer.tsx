import { createErrorReducer, createIsFetchingReducer } from './common';
import { combineReducers } from 'redux';




const MemberReducer = () => {
 const data = (state:any =[] , action:any) => {

  const { type, members } = action;
  switch (type) {
    case 'GET_MEMBERS_INIT':
    case 'GET_MEMBERS_ERROR':
      return [];
    case 'GET_MEMBERS_SUCCESS':
      return members;
    case 'DELETE_MEMBERS_SUCCESS':
      debugger;
      let data=state.filter((item:any)=>item?.id!=members.id)
      return data;

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
