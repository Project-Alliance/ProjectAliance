import { createErrorReducer, createIsFetchingReducer } from './common';
import { combineReducers } from 'redux';



const OrganizationReducer = () => {
 const Organization = (state =null  , action:any) => {
  debugger
  const { type, organization } = action;
  switch (type) {
    case 'CREATE_ORGANIZATION_INIT':
    case 'CREATE_ORGANIZATION_FAILURE':
      return null;
    case 'CREATE_ORGANIZATION_SUCCESS':
      return organization;
    default:
      return state;
 }
};

return combineReducers({
  Organization,
  isChecking: createIsFetchingReducer('CREATE_ORGANIZATION'),
  error: createErrorReducer('CREATE_ORGANIZATION'),
});
}

export default OrganizationReducer();
