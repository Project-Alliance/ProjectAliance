/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { notify, toggleMailReceived, toggleOnLogin,toggleOnPasswordChanged,toggleOnProjectCreated } from 'renderer/Store/ReduxToolkit/Notification';

export const SettingsNotifications = (props:any) => {
  const dispatch = useDispatch();
  const notification = useSelector(({notification}:notify) => notification);

  return (
    <form {...props}>
      <Card style={{marginRight:100}}>
        <CardHeader subheader="Manage the notifications" title="Notifications" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid
              item
              md={4}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
              xs={12}
            >
              <Typography color="textPrimary" gutterBottom variant="h6">
                Notifications
              </Typography>
              <FormControlLabel
                control={
                <Checkbox color="primary"
                checked={notification.mailReceived}
                onChange={(event) => {
                  dispatch(toggleMailReceived());
                }}
                defaultChecked />}
                label="on Mail Recieved"
              />
              <FormControlLabel
                control={<Checkbox color="primary"
                onChange={(event) => {
                  dispatch(toggleOnProjectCreated());
                }}
                checked={notification.onProjectCreated}
                defaultChecked />}
                label="On Project Created"
              />

            </Grid>
            <Grid
              item
              md={4}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
              xs={12}
            >
              <Typography color="textPrimary" gutterBottom variant="h6">
                Notification
              </Typography>
              <FormControlLabel control={<Checkbox
              checked={notification.onLogin}
              onChange={(event) => {
                dispatch(toggleOnLogin());
              }
              }
              />} label="on Login" />
              <FormControlLabel
                control={<Checkbox color="primary"
                checked={notification.onPasswordChanged}
                onChange={(event) => {
                  dispatch(toggleOnPasswordChanged());
                }
                }
                defaultChecked />}
                label="On Password Changed"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
}
