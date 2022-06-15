/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Container, Row, Col  } from 'renderer/Components/layout';
import { Button, CircularProgress,Box,Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from 'renderer/Store/Actions/auth.action';
import { SettingsNotifications } from './settings-notifications';
import { SettingsPassword } from './settings-password';

const Profile = () => {
  const [error, setError] = React.useState({ message: '', status: false });
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();

  const validateData = () => {
    const nameExpression = /^[a-zA-Z ]{3,30}$/;
    const EmailExpression = /^\w{3,}.[a-z]{3,}.[a-z]{3,}$/g;
    const userNameExpression = /^[a-zA-Z0-9]{3,30}$/g;

    if (inputData.name == '') {
      setError({ message: 'Name is required', status: false });
      return false;
    } else if (inputData.Email == '') {
      setError({ message: 'Email is required', status: false });
      return false;
    } else if (inputData.userName == '') {
      setError({ message: 'UserName is required', status: false });
      return false;
    } else if (inputData.Password == '') {
      setError({ message: 'Password is required', status: false });
      return false;
    } else if (inputData.phone == '') {
      setError({ message: 'Phone is required', status: false });
      return false;
    } else if (inputData.company == '') {
      setError({ message: 'Company is required', status: false });
      return false;
    } else if (inputData.role == '') {
      setError({ message: 'Role is required', status: false });
      return false;
    } else if (!inputData.name.match(nameExpression)) {
      setError({ message: 'Name is not valid', status: false });
      return false;
    } else if (!inputData.Email.match(EmailExpression)) {
      setError({ message: 'Email is not valid', status: false });
      return false;
    } else if (!inputData.userName.match(userNameExpression)) {
      setError({ message: 'UserName is not valid', status: false });
      return false;
    } else if (inputData.Password.length <= 8) {
      setError({ message: 'Password is not valid', status: false });
      return false;
    }

    setError({ message: '', status: false });
    return true;
  };

  const [inputData, setInputdata] = React.useState({
    name: '',
    Email: '',
    userName: '',
    Password: '',
    phone: '',
    company: '',
    role: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    let data = { ...inputData, [name]: value };
    setInputdata(data);
  };

  return (
    <Container style={{ }}>   
    <Box
      component="main"
      sx={{
        flexGrow: 4,
        py: 2
      }}
    >
      <Container >
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Settings
        </Typography>
        <SettingsNotifications />
        <Box sx={{ pt: 2 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>

    <Row className="button-Style">
        <Col>
          <Button
            disabled={loader}
            // onClick={() => CreateUser()}
            onClick={() => {
              dispatch(logout());
            }}
            className="ButtonStyle btn Create-Button"
            style={{
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: '#EBEBEB',
              color: '#000000',
              width: 200,
              marginTop: 2,
              borderRadius: 15,
              marginBottom:50
            }}
          >
            {loader ? <CircularProgress size={30} /> : 'Logout'}
          </Button>
        </Col>
      </Row>
      
  
    </Container>
  );
};

export default Profile;
