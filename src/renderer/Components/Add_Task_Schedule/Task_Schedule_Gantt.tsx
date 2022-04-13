import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbar,
  GridColDef,
  GridEditCellProps,
  GridPreProcessEditCellProps,
} from '@mui/x-data-grid';

import { Theme, styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Notification from 'renderer/Util/Notification';
import {
  StyledDataGrid,
  CustomPagination,
  customCheckbox,
  formatDate,
  propsType,
} from './CustomGridCompoment';


let promiseTimeout: any;
export default function Task_Schedule_Gantt({data}:propsType) {
  const keyStrokeTimeoutRef = React.useRef<any>();

  const onEditCell = (params: any) =>
    new Promise<GridEditCellProps>((resolve) => {
      clearTimeout(promiseTimeout);
      clearTimeout(keyStrokeTimeoutRef.current);

      //console.log('called', params.props.value);

      // basic debouncing here
      keyStrokeTimeoutRef.current = setTimeout(async () => {
        try {
          resolve({ ...params.props, error: params.props.value === '3' });
        } catch (error) {
          console.error(error);
        }
      }, 500);
    });
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      width: 10,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 10,
          }}
        >
          {params.value}
        </div>
      ),
    },
    // {
    //   field:duration:'365 Days' ',task_Name',
    //   headerName:duration:'365 Days' ',task_Name',
    //   width: 70,
    //   // editable: true,
    //   renderCell: (params) => <img src={params.value} style={{borderWidth:'2px',borderColor:'blue',borderStyle:'solid',borderRadius:'30px'}} />,
    // },
    {
      field: 'name',
      headerName: 'name',
      minWidth: 80,
      editable: true,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 10,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 80,
      editable: false,
      cellClassName: 'duration1',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 10,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'start',
      headerName: 'Start',
      width: 80,
      type: 'date',
      editable: true,
      preProcessEditCellProps: onEditCell,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 10,
          }}
        >
          {formatDate(params.value)}
        </div>
      ),
    },
    {
      field: 'end',
      headerName: 'end',
      width: 80,
      type: 'date',
      editable: true,

      preProcessEditCellProps: onEditCell,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 10,
          }}
        >
          {formatDate(params.value)}
        </div>
      ),
    },
    {
      field: 'dependencies',
      headerName: 'dependencies',
      description: 'On which task it depends',
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 10,
          }}
        >
          {params.value}
        </div>
      ),
    },

    // {
    //   field: 'resource',
    //   headerName: 'Resource Name',
    //   description: 'This will update the data cell.',
    //   sortable: false,
    //   width: 80,

    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         fontSize: 10,
    //       }}
    //     >
    //       {params.value}
    //     </div>
    //   ),
    // },
  ];
  return (
    <div style={{ height: 600, width: '100%' }}>
      <StyledDataGrid
        checkboxSelection
        pageSize={30}
        rowsPerPageOptions={[30]}
        disableSelectionOnClick
        components={{
          Pagination: CustomPagination,
          Toolbar: GridToolbar,
        }}
        rows={data}
        columns={columns}
      />
    </div>
  );
}
