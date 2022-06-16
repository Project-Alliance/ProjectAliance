import { Button, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-web-vector-icons';
import Api from 'renderer/Api/auth.api';
import { COLORS } from 'renderer/AppConstants';
import InputButton from 'renderer/Components/InputButton';
import { H1 } from 'renderer/Components/layout';
import DropDownMenuSelect from 'renderer/Components/DropDownMenue';
import {
  EnvOptions,
  TestPlanOptions,
  TestCaseResultOptions,
} from './SideBarButtonsSetails';
import AddEnviorment from 'renderer/Components/QualityPopupForms/AddEnviorment';
import AddTestPlan from 'renderer/Components/QualityPopupForms/AddTesPlan';
import AddTestCases from 'renderer/Components/QualityPopupForms/AddTestCases';
import AddTestCasesResult from 'renderer/Components/QualityPopupForms/AddTestResult';

export default function ChangePlaning() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const [isOpenT, setIsOpenT] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);

  const [testPlanId, setTestPlanId] = useState(0);

  const [testCaeId, setTestCaeId] = useState(0);
  const [testCaseDisply, setTestCasesDisply] = useState(true);

  const [envId, setEnvId] = useState(0);

  const [simpleTestCase, setsimpleTestCase] = useState([]);
  const [RequirementBased, setRequirementBased] = useState([]);
  const user = useSelector(({ auth }: any) => auth.user);

  const DefaultProject = useSelector(
    ({ SelectedProject }: any) => SelectedProject
  );
  const GetTestCase = async () => {
    let data = await Api.getTestCases(DefaultProject.pid, user?.accessToken);
    if (data.status) {
      setsimpleTestCase(data.data);
    }
  };
  const GetRequirementBasedTestCase = async () => {
    debugger;
    let data = await Api.getRequirementBasedTestCases(
      DefaultProject.pid,
      user?.accessToken
    );
    if (data.status) {
      setRequirementBased(data.data);
    }
  };
  useEffect(() => {
    if (simpleTestCase.length <= 0) {
      GetTestCase();
    }
  }, []);
  useEffect(() => {
    if (RequirementBased.length <= 0) {
      GetRequirementBasedTestCase();
    }
  }, []);
  return (
    <div className="Main_Task_List" style={{ padding: 20 }}>
      <AddEnviorment
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        projectId={DefaultProject?.pid}
        updateData={GetTestCase}
      />
      <AddTestPlan
        isOpen={isOpenP}
        envId={envId}
        setIsOpen={setIsOpenP}
        updateData={GetTestCase}
      />
      <AddTestCases
        isOpen={isOpenT}
        testPlanId={testPlanId}
        setIsOpen={setIsOpenT}
        updateData={GetTestCase}
      />
      <AddTestCasesResult
        isOpen={isOpenR}
        testCaseId={testCaeId}
        setIsOpen={setIsOpenR}
        updateData={GetTestCase}
      />
      <InputButton
        onClick={() => {
          setTestCasesDisply(true);
        }}
        className="Create-Button btn"
        buttonStyle={{
          color: testCaseDisply ? COLORS.primary : COLORS.black,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'unset',
        }}
        title="Test Cases"
      />
      <InputButton
        onClick={() => {
          setTestCasesDisply(false);
        }}
        className="Create-Button btn"
        buttonStyle={{
          color: !testCaseDisply ? COLORS.primary : COLORS.black,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'unset',
        }}
        title="Requirement Based Test Cases"
      />
      {testCaseDisply && (
        <>
          <table>
            <thead className="table__heading ">
              <tr className="table__row">
                <th>Enviorment</th>
                <th>Test Plan</th>
                <th>Test Cases</th>
                <th>Category Type</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table__content">
              {simpleTestCase.length > 0 ? (
                simpleTestCase.map((item: any, index: number) => (
                  <>
                    <tr className="table__row">
                      <td colSpan={5} style={{ color: COLORS.primary }}>
                        {item?.name}
                      </td>
                      <td>
                        {/* Add Menue Here */}
                        <DropDownMenuSelect
                          values={EnvOptions}
                          handleOnClick={(value: any) => {
                            if (value == 'Add New Enviorment') {
                              setIsOpen(true);
                            } else if (value == 'Add New Test Plan') {
                              setEnvId(item.id);
                              setIsOpenP(true);
                            }
                          }}
                        />
                      </td>
                    </tr>
                    {item?.plans.map((testPlan: any, planIndex: number) => (
                      <>
                        <tr className="table__row">
                          <td></td>
                          <td style={{ color: COLORS.Rose }} colSpan={4}>
                            {testPlan?.name}
                          </td>
                          <td>
                            {/* Add Menue Here */}
                            <DropDownMenuSelect
                              values={TestPlanOptions}
                              handleOnClick={() => {
                                setIsOpenT(true);
                                setTestPlanId(testPlan.id);
                              }}
                            />
                          </td>
                        </tr>
                        {testPlan?.testCases.map(
                          (testCase: any, caseIndex: number) => (
                            <>
                              <tr className="table__row">
                                <td colSpan={2}></td>

                                <td style={{ color: COLORS.success }}>
                                  {testCase?.name}
                                </td>

                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryType}
                                </td>
                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryName}
                                </td>
                                <td>
                                  {/* Add Menue Here */}
                                  <DropDownMenuSelect
                                    values={TestCaseResultOptions}
                                    handleOnClick={() => {
                                      setTestCaeId(testCase.id);
                                      setIsOpenR(true);
                                    }}
                                  />
                                </td>
                              </tr>
                            </>
                          )
                        )}
                      </>
                    ))}
                  </>
                ))
              ) : null}
            </tbody>
          </table>
        </>
      )}
      {!testCaseDisply && (
        <>
          <table>
            <thead>
              <tr className="table-headers">
                <th>Enviorment</th>
                <th>Test Plan</th>
                <th>Test Cases</th>
                <th>Category Type</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {RequirementBased.length > 0 ? (
                RequirementBased.map((item: any, index: number) => (
                  <>
                    <tr className="table__row">
                      <td colSpan={5} style={{ color: COLORS.primary }}>
                        {item?.name}
                      </td>
                      <td>
                        {/* Add Menue Here */}
                        <DropDownMenuSelect
                          values={EnvOptions}
                          handleOnClick={(value: any) => {
                            if (value == 'Add New Enviorment') {
                              setIsOpen(true);
                            } else if (value == 'Add New Test Plan') {
                              setEnvId(item.id);
                              setIsOpenP(true);
                            }
                          }}
                        />
                      </td>
                    </tr>
                    {item?.plans.map((testPlan: any, planIndex: number) => (
                      <>
                        <tr className="table__row">
                          <td></td>
                          <td style={{ color: COLORS.Rose }} colSpan={4}>
                            {testPlan?.name}
                          </td>
                          <td>
                            {/* Add Menue Here */}
                            <DropDownMenuSelect
                              values={TestPlanOptions}
                              handleOnClick={() => {
                                setIsOpenT(true);
                                setTestPlanId(testPlan.id);
                              }}
                            />
                          </td>
                        </tr>
                        {testPlan?.testCases.map(
                          (testCase: any, caseIndex: number) => (
                            <>
                              <tr className="table__row">
                                <td colSpan={2}></td>

                                <td style={{ color: COLORS.success }}>
                                  {testCase?.name}
                                </td>

                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryType}
                                </td>
                                <td style={{ color: COLORS.success }}>
                                  {testCase?.categoryName}
                                </td>
                                <td>
                                  {/* Add Menue Here */}
                                  <DropDownMenuSelect
                                    values={TestCaseResultOptions}
                                    handleOnClick={() => {
                                      setTestCaeId(testCase.id);
                                      setIsOpenR(true);
                                    }}
                                  />
                                </td>
                              </tr>
                            </>
                          )
                        )}
                      </>
                    ))}
                  </>
                ))
              ) : null}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
