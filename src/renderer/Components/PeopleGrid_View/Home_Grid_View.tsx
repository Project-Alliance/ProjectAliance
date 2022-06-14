import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import InputButton from '../InputButton';
import Icon from 'react-web-vector-icons';
import { useSelector,useDispatch } from 'react-redux';
import {deleteMembers} from "../../Store/Actions/members.action"
import PermissionPopUp from 'renderer/Components/PeopleGrid_View/PermissionPopUp';


export default function DataGridDemo({data=[]}:any) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(({ auth }: any) => auth.user);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40,editable:false },

    {
      field: 'profilePic',
      headerName: 'Image',
      width: 70,

      renderCell: (params) => <img src={params.row.profilePic} style={{width:40,height:40,borderRadius:20,borderWidth:'2px',borderColor:'blue',borderStyle:'solid',}} />,
    },
    {
      field: 'name',
      headerName: 'Name',

      minWidth: 100,
      editable: true,
    },

    {
      field: 'role',
      headerName: 'Role',
      width: 90,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 195,
      editable: false,
    },

    {
      field: 'Update',
      headerName: 'Update',
      description: 'This will update the data cell.',
      sortable: false,
      width: 80,
      renderCell: (cellValues) => {


        return (

          <div style={{marginLeft:20}}>


          <Icon  name='edit' font='AntDesign'  color='black'  size={25}
          />
          </div>

        );
      }
    },
    {
      field: 'action',
      type: 'action',
      headerName: 'Delete',
      description: 'This will update the data cell.',
      sortable: false,
      width: 80,
      renderCell: (params) => {
        if(params.id!=user.id){
        return (

          <div style={{marginLeft:20}}
          onClick={() => dispatch(deleteMembers(Number(params.id),user.accessToken))}
          >
            <Icon  name='delete' font='AntDesign'  color='black'  size={25} // style={{}}
          />
          </div>

        );}
        else{
          return (

            <div style={{marginLeft:20}}
            >
              me
            </div>

          );
        }
      }
    },
    {
      field: 'Share',
      headerName: 'Share',
      description: 'This will Share the data cell to your Members.',
      sortable: false,
      width: 80,
      renderCell: (cellValues) => {
        return (

          <div  style={{marginLeft:20}} onClick={()=>alert(cellValues.id)} >
            <Icon  name='sharealt' font='AntDesign'  color='black'  size={25}  // style={{}}
          />
          </div>

        );
      }
    },
    {
      field: 'Permissions',
      headerName: 'Permissions',
      // description: 'This will Share the data cell to your Members.',
      sortable: false,
      width: 100,
      renderCell: (cellValues) => {
        return (

          <div  style={{marginLeft:20}} onClick={(props: any) => {
            // props.ParentHistory.push('/createOrganization');
            setIsOpen(!isOpen);
          }} >
             <Icon  name='lock1' font='AntDesign'  color='black'  size={25}  // style={{}}
          />
          </div>

        );
      }
    },
  ];
  return (
    <div style={{ height: 600, width: '100%'}}>
       <PermissionPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection

        disableSelectionOnClick/>
    </div>
  );
}
