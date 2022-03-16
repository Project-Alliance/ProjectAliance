import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams,GridValueFormatterParams } from '@mui/x-data-grid';
import InputButton from '../InputButton';
import Icon from 'react-web-vector-icons';
import { display } from '@mui/system';



const columns: GridColDef[] = [

  { field: 'id', headerName: 'ID', width: 10, hide: true },
  { field: 'no', headerName: 'No', width: 10, },
  // {
  //   field:duration:'365 Days' ',task_Name',
  //   headerName:duration:'365 Days' ',task_Name',
  //   width: 70,
  //   // editable: true,
  //   renderCell: (params) => <img src={params.value} style={{borderWidth:'2px',borderColor:'blue',borderStyle:'solid',borderRadius:'30px'}} />,
  // },
  {
    field:'task_Name',
    headerName: 'Task Name',
    minWidth: 130,
    editable: true,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 100,
    editable: true,
    cellClassName:'duration1'

  },
  {
    field: 'start',
    headerName: 'Start',
    width: 120,
    type:'date',
    editable: true,
  },
  {
    field: 'finish',
    headerName: 'Finish',
    width: 120,
    type:'date',
    editable: true,
  },
  {
    field: 'predecessors',
    headerName: 'Predecessor',
    description: 'how many people are doing',
    sortable: false,
    width: 150,
  },

  {
    field: 'resource',
    headerName: 'Resource Name',
    description: 'This will update the data cell.',
    sortable: false,
    width: 150,
  },
  {
    field: 'new_column',
    headerName: 'Add New column',
    description: 'This will update the data cell.',
    sortable: false,
    width: 150,
  },
];

const rows = [
  { id: 1,no:1, duration:'365 Days'  ,task_Name: "Development",start:'10/02/2022',finish:'03/02/2023',  },
  { id: 2,no:2, duration:'365 Days'  ,task_Name: "Scope", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 3,no:3, duration:'365 Days'  ,task_Name: "Analysis ", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 4,no:4, duration:'365 Days'  ,task_Name: "Design", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 5,no:5, duration:'365 Days'  ,task_Name: "Development", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 6,no:6, duration:'365 Days'  ,task_Name: "Testing", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 7,no:7, duration:'365 Days'  ,task_Name: "Training", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 8,no:8, duration:'365 Days'  ,task_Name: "Documentation", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 9,no:9, duration:'365 Days'  ,task_Name: "Pilot", start:'10/02/2022',finish:'03/02/2023',  },
  { id: 10,no:10,duration:'365 Days', task_Name: "Deployment", start:'10/02/2022',finish:'03/02/2023', },
  { id: 11,no:11,duration:'365 Days', task_Name: "Post Implement", start:'10/02/2022',finish:'03/02/2023',  },

];

export default function Task_Schedule_Gantt() {

  // console.log(data)
  return (
    <div style={{ height: 600, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection
        disableSelectionOnClick/>
    </div>
  );
}

