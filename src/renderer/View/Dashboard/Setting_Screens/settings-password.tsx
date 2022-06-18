/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'renderer/View/Email/features/userSlice';
import Api from 'renderer/Api/auth.api';

export const SettingsPassword = (props:any) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const user = useSelector(selectUser);


  const handleChange = (event:any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit =async (event:any) => {
    event.preventDefault();

   try{
    let Data={
      "userName":user.userName,
      "password": values.password,
      "newPassword": values.confirm
    }
     let res = await Api.updatePassword(Data, user?.accessToken);
    if (res.status == 200) {
      alert('Password updated');
    }}
    catch(err){
      alert('Error updating password');
    }


  }

  return (
    <form {...props}>
      <Card style={{marginRight:100}}>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
          onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
