/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable prefer-template */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
import { AnyListenerPredicate } from '@reduxjs/toolkit/dist/listenerMiddleware/types';
import { StringifyOptions } from 'querystring';
import http from '../Util/http-common';

class ApiCntainerClass {
  SignIn(data: any) {
    return http.post('/auth/signin', data);
  }

  Register(data: any) {
    return http.post(`/auth/signup`, data);
  }

  createOrganizationApi(data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post('/createOrganization', data, { headers: header });
  }

  AddMembers(data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return new Promise(async (resolve, reject) => {
      const result = http
        .post('/Members/create', data, { headers: header })
        .catch((err) => {
          reject(err);
        });
      resolve(result);
    });
  }
  GetMembers(company: string, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Members/get/${company}`, { headers: header });
  }

  deleteMembers(company: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/Members/delete/${company}`, { headers: header });
  }
  UpdateMembers(id: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/Members/update/${id}`, { headers: header });
  }
  CreateProject(data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post('/Project/create', data, { headers: header });
  }

  GetProjects(company: string, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Project/get/${company}`, { headers: header });
  }

  UploadDocument(data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/document/SaveDocument`, data, { headers: header });
  }

  CreateDocumentSection(data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/document/createsection`, data, { headers: header });
  }

  SaveDocumentToDatabase(data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/document/saveDocumentToDatabase`, data, {
      headers: header,
    });
  }

  GetDocument(pid: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/document/GetDocument/${pid}`, { headers: header });
  }

  DeleteSection(sid: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/document/deleteSection/${sid}`, { headers: header });
  }

  DeleteDocument(documentId: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/document/DeleteDocument/${documentId}`, {
      headers: header,
    });
  }

  UpdateDocument(documentId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/document/UpdateDocument/${documentId}`, data, {
      headers: header,
    });
  }

  GetGoals(company: string, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/goals/get/${company}`, { headers: header });
  }

  GetProjectteam(pid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Project/getProjectTeam/${pid}`, { headers: header });
  }
  AddTeamMember(pid: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Project/AddProjectTeam/${pid}`, data, {
      headers: header,
    });
  }
  UpdateTeamMember(teamid: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/Project/updateteam/${teamid}`, data, { headers: header });
  }

  RemoveTeamMember(teamid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/Project/reomoveteam/${teamid}`, { headers: header });
  }

  RemoveGoal(goalid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/goals/delete/${goalid}`, { headers: header });
  }

  GetSchedule(pid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/schedule/${pid}`, { headers: header });
  }
  CreateSchedule(pid: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Schedule/create/${pid}`, data, { headers: header });
  }

  updateSchedule(sid: string, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/Schedule/update/${sid}`, data, { headers: header });
  }
  createRequirementModule(projectId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Requirements/createModule/${projectId}`, data, {
      headers: header,
    });
  }
  createRequirement(
    moduleId: number,
    projectId: number,
    data: any,
    token: string
  ) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(
      `/Requirements/create?projectId=${projectId}&moduleId=${moduleId}`,
      data,
      { headers: header }
    );
  }
  updateRequirement(rid: number, projectId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.put(
      `/Requirements/update?reqId=${rid}&projectId=${projectId}`,
      data,
      { headers: header }
    );
  }
  deleteRequirement(rid: number, projectId: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(
      `/Requirements/delete?reqId=${rid}&projectId=${projectId}`,
      { headers: header }
    );
  }
  deleteRequirementModule(mid: number, projectId: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(
      `/Requirements/deleteModule?moduleId=${mid}&projectId=${projectId}`,
      { headers: header }
    );
  }
  updateRequirementModule(mid: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/Requirements/updateModule?moduleId=${mid}`, data, {
      headers: header,
    });
  }
  getRequirementModule(projectId: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Requirements/get/${projectId}`, { headers: header });
  }
  deleteAttchment(rid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/Requirements/deleteAttachment?reqId=${rid}`, {
      headers: header,
    });
  }

  GetQualitySchedule(pid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/QualitySchedule/${pid}`, { headers: header });
  }

  CreateQualitySchedule(pid: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/QualitySchedule/create/${pid}`, data, {
      headers: header,
    });
  }

  updateQualitySchedule(sid: string, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/QualitySchedule/update/${sid}`, data, {
      headers: header,
    });
  }

  CreateEnviorment(pid: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Quality/addEnviorment?pid=${pid}`, data, {
      headers: header,
    });
  }
  CreateTestPlan(envId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Quality/addTestPlan?envId=${envId}`, data, {
      headers: header,
    });
  }

  CreateTestCases(testPlanId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Quality/addTestCase?testPlanId=${testPlanId}`, data, {
      headers: header,
    });
  }
  CreateTestResult(testCaseId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Quality/addTestResult?testCaseId=${testCaseId}`, data, {
      headers: header,
    });
  }
  getTestCases(pid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Quality/getTestCases?pid=${pid}`, { headers: header });
  }

  getRequirementBasedTestCases(pid: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Quality/getRequirementBasedTestCases?pid=${pid}`, {
      headers: header,
    });
  }

  getReceivedMail(token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/mail/getRecivedMail`, { headers: header });
  }
  getSentMail(token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/mail/getSentMail`, { headers: header });
  }
  getIsStarredMail(token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/mail/getIsStarredMail`, { headers: header });
  }
  sendMail(data: any, token: string) {
    const header = {
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/mail/sendMail`, data, { headers: header });
  }
  markAsRead(mailId: number, token: string) {
    const header = {
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/mail/updateMailIsRead?mailId=${mailId}`, {
      headers: header,
    });
  }
  starMail(mailId: number, token: string) {
    const header = {
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + token,
    };
    return http.put(`/mail/updateMailIsStared?mailId=${mailId}`, {
      headers: header,
    });
  }
  deleteMail(mailId: number, token: string) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/mail/deleteMail?mailId=${mailId}`, {
      headers: header,
    });
  }
  Addcomment(reqId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Comments/AddComments?reqId=${reqId}`, data, {
      headers: header,
    });
  }
  AddReply(comId: string, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Comments/AddReplies?comId=${comId}`, data, {
      headers: header,
    });
  }
  GetComment(reqId: number, token: string) {
    const header = {
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Comments/GetComments?reqId=${reqId}`, {
      headers: header,
    });
  }
  AddBoardLane(projectId: number, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Kanban/AddBoardLane?projectId=${projectId}`, data, {
      headers: header,
    });
  }
  AddBoardCard(laneId: string, data: any, token: string) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/Kanban/AddBoardCard?laneId=${laneId}`, data, {
      headers: header,
    });
  }
  getBoardLane(projectId: string, token: string) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/Kanban/getBoardLane?projectId=${projectId}`, {
      headers: header,
    });
  }
  DeleteBoardLane(lid: string, token: string) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/Kanban/deleteBoardLane?lid=${lid}`, {
      headers: header,
    });
  }
  deleteBoardCard(cardId: string, token: string) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.delete(`/Kanban/deleteBoardCard?id=${cardId}`, {
      headers: header,
    });
  }

  updateBoardLane(
    data: { lid: string; title: string; label: string },
    token: string
  ) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.put(
      `/Kanban/updateBoardLane?lid=${data.lid}&title=${data.title}&label=${data.label}`,
      data,
      { headers: header }
    );
  }
  updateBoardCard(
    data: {
      id: string;
      title: string | null;
      label: string | null;
      description: string | null;
      laneId: string;
    },
    token: string
  ) {
    const header = {
      'Content-Type': 'application/json;',
      Authorization: 'Bearer ' + token,
    };
    return http.put(
      `/Kanban/updateBoardCard?id=${data.id}&title=${data.title}&label=${data.label}&description=${data.description}&laneId=${data.laneId}`,
      data,
      { headers: header }
    );
  }
  updateProfile(userName: string, data: any, token: string) {
    const header = {
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
    };
    return http.put(`/auth/updateProfile?userName=${userName}`, data, {
      headers: header,
    });
  }
  forgotPassword(userName:string)
  {
    return http.post(`/auth/forgotPassword?userName=${userName}`);
  }

}
export default new ApiCntainerClass();
