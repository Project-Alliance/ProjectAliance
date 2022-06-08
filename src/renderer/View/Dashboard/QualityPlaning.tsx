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

export default function QualityPlaning() {
  const [testCases, setTestCases] = useState({
    simpleTestCase: [],
    RequirementBased: [],
  });
  const user = useSelector(({ auth }: any) => auth.user);

  const DefaultProject = useSelector(
    ({ SelectedProject }: any) => SelectedProject
  );
  const GetTestCase = async () => {
    let data = await Api.getTestCases(DefaultProject.pid, user?.accessToken);
    if (data.status) {
      debugger;
      console.log(data.data);
      setTestCases({ ...testCases, simpleTestCase: data.data });
    }
  };
  const GetRequirementBasedTestCase = async () => {
    let data = await Api.getRequirementBasedTestCases(
      DefaultProject.pid,
      user?.accessToken
    );
    if (data.status) {
      setTestCases({ ...testCases, RequirementBased: data.data });
    }
  };
  useEffect(() => {
    if (testCases.simpleTestCase.length == 0) {
      GetTestCase();
    }
  }, [testCases]);
  useEffect(() => {
    if (testCases.RequirementBased.length == 0) {
      GetRequirementBasedTestCase();
    }
  }, [testCases]);
  return (
    <div
      className="Main_Task_List"
      style={{ padding: 20, overflowY: 'scroll' }}
    >
      <H1 style={{ marginTop: 10 }}>Test Cases</H1>
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
          {testCases.simpleTestCase.map((item: any, index: number) => (
            <>
              <tr>
                <td colSpan={5}>{item?.name}</td>
                <td>
                  {/* Add Menue Here */}
                  <DropDownMenuSelect
                    values={EnvOptions}
                    handleOnClick={() => {
                      console.log('drop down');
                    }}
                  />
                </td>
              </tr>
              {item?.plans.map((testPlan: any, planIndex: number) => (
                <>
                  <tr>
                    <td></td>
                    <td colSpan={4}>{testPlan?.name}</td>
                    <td>
                      {/* Add Menue Here */}
                      <DropDownMenuSelect
                        values={TestPlanOptions}
                        handleOnClick={() => {
                          console.log('drop down');
                        }}
                      />
                    </td>
                  </tr>
                  {testPlan?.testCases.map(
                    (testCase: any, caseIndex: number) => (
                      <>
                        <tr>
                          <td colSpan={2}></td>

                          <td>{testCase?.name}</td>

                          <td>{testCase?.categoryType}</td>
                          <td>{testCase?.categoryName}</td>
                          <td>
                            {/* Add Menue Here */}
                            <DropDownMenuSelect
                              values={TestCaseResultOptions}
                              handleOnClick={() => {
                                console.log('drop down');
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
          ))}
        </tbody>
      </table>
      <H1 style={{ marginTop: 10 }}>Requirement Based Test Cases</H1>
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
          {testCases.RequirementBased.map((item: any, index: number) => (
            <>
              <tr>
                <td colSpan={5}>{item?.name}</td>
                <td>
                  {/* Add Menue Here */}
                  <DropDownMenuSelect
                    values={EnvOptions}
                    handleOnClick={() => {
                      console.log('drop down');
                    }}
                  />
                </td>
              </tr>
              {item?.plans.map((testPlan: any, planIndex: number) => (
                <>
                  <tr>
                    <td></td>
                    <td colSpan={4}>{testPlan?.name}</td>
                    <td>
                      {/* Add Menue Here */}
                      <DropDownMenuSelect
                        values={TestPlanOptions}
                        handleOnClick={() => {
                          console.log('drop down');
                        }}
                      />
                    </td>
                  </tr>
                  {testPlan?.testCases.map(
                    (testCase: any, caseIndex: number) => (
                      <>
                        <tr>
                          <td colSpan={2}></td>

                          <td>{testCase?.name}</td>

                          <td>{testCase?.categoryType}</td>
                          <td>{testCase?.categoryName}</td>
                          <td>
                            {/* Add Menue Here */}
                            <DropDownMenuSelect
                              values={TestCaseResultOptions}
                              handleOnClick={() => {
                                console.log('drop down');
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
