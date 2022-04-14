import Api from 'renderer/Api/auth.api';
import { useSelector } from 'react-redux';
import { AUTH } from 'Types/User.types';
import { idID } from '@mui/material/locale';

const GetSchedule = (id: number, accessToken: string) => (dispatch: any) => {
  dispatch({ type: 'GET_Schedule_INIT' });

  Api.GetSchedule( id, accessToken)
    .then((data) => {
      if (data?.status == 200) {
        debugger;
        dispatch({ type: 'GET_Schedule_SUCCESS', schedule: data.data });
      } else {
        debugger;
        dispatch({ type: 'GET_Schedule_ERROR', error: data?.data });
      }
    })
    .catch((error) => {
      if (error.message == 'Network Error')
        dispatch({
          type: 'GET_Schedule_ERROR',
          error: { message: 'Network Error' },
        });
      else debugger;
      dispatch({ type: 'GET_Schedule_ERROR', error: error.response?.data });
    });
};

export { GetSchedule };
