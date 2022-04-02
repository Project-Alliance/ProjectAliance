import { StringifyOptions } from "querystring";
import http from "../Util/http-common";

class ApiCntainerClass {


  SignIn(data:any) {
     ;
    return http.post("/auth/signin", data);
  }

  Register(data:any) {
    return http.post(`/auth/signup`, data);
  }


   createOrganizationApi(data:any,token:string) {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ token
      }
    return http.post('/createOrganization', data,{headers:header});
  }

  AddMembers(data:any,token:string) {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return new Promise(async(resolve,reject)=>{
    const result = http.post('/Members/create', data,{headers:header})
    .catch(err=>{
      reject(err);
    })
    resolve(result);
  })

  }
  GetMembers(company:string,token:string) {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.get(`/Members/get/${company}`,{headers:header});
  }

  deleteMembers(company:number,token:string) {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.delete(`/Members/delete/${company}`,{headers:header});
  }
  UpdateMembers(id:number,token:string) {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.put(`/Members/update/${id}`,{headers:header});
  }
  CreateProject(data:any,token:string) {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
     ;
  return http.post('/Project/create', data,{headers:header});
  }
  GetProjects(company:string,token:string) {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.get(`/Project/get/${company}`,{headers:header});
  }

  UploadDocument(data:any,token:string)
  {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.post(`/document/SaveDocument`,data,{headers:header});
  }

  CreateDocumentSection(data:any,token:string)
  {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.post(`/document/createsection`,data,{headers:header});
  }
  SaveDocumentToDatabase(data:any,token:string)
  {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.post(`/document/saveDocumentToDatabase`,data,{headers:header});
  }

  GetDocument(pid:any,token:string)
  {

    const header = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    }
  return http.get(`/document/GetDocument/${pid}`,{headers:header});
  }




}

export default new ApiCntainerClass();
