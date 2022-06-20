import * as React from 'react';
import {
  GridToolbar,
  GridColDef,
} from '@mui/x-data-grid';

import { Theme, styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  StyledDataGrid,
  CustomPagination,
  formatDate,
  propsType,
} from './CustomGridCompoment';
import { Notification } from 'renderer/Util/Notification/Notify';
import Icon from 'react-web-vector-icons';
import Api from 'renderer/Api/auth.api';

let promiseTimeout: any;
export default function Task_Schedule_Gantt({data,handleEdit,getSchedule}:propsType) {

  //delete schedule api call
  const handleDelete = (id:any) => {
    try{

      Api.deleteSchedule(id).then((res: any) => {
        if (res.status === 200) {
          getSchedule();
          Notification('Success','Delete Successfully',"success");
          console.log("rehan is here",res);
        }
      })
    }catch(err){
      console.log(err);
    }
  }

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
            marginLeft:5
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
            marginLeft:20
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
      width: 130,
      editable: true,
      renderEditCell: (params) => (<select>
        <option value="">Select</option>

      </select>),
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 10,
            marginLeft: 40,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'delete',
      description: 'It will be removed from Schedule Table',
      sortable: false,
      width: 80,
      editable: false,
      renderCell: (params) => {
         return(
          <div style={{marginLeft:10}} onClick={() => handleDelete(params.id)}  >
            <Icon  name='delete' font='AntDesign'  color='black'  size={15} />
          </div>
         );
      }
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
        onCellDoubleClick={handleEdit}

      />
    </div>
  );
}
