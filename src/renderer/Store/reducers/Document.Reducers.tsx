import { createErrorReducer, createIsFetchingReducer } from './common';
import { combineReducers } from 'redux';


interface ActionType{
  type:"SAVE_DOCUMENT_INIT"|"SAVE_DOCUMENT_SUCCESS"|"SAVE_DOCUMENT_ERROR"|"GET_DOCUMENT_INIT"|"GET_DOCUMENT_SUCCESS"|"GET_DOCUMENT_ERROR";
  document:any;
  }


 const DocumentManager = (state =[] , action:ActionType) => {

  debugger
  const { type, document } = action;
  switch (type) {
    case 'GET_DOCUMENT_INIT':
    case 'GET_DOCUMENT_ERROR':
      return [];
    case 'GET_DOCUMENT_SUCCESS':
      case 'SAVE_DOCUMENT_SUCCESS':
      return document;
    default:
      return state;
 }
};




export default DocumentManager;
