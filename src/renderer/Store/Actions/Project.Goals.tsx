import Api from 'renderer/Api/auth.api';
import { useSelector } from 'react-redux';
import { AUTH } from 'Types/User.types';

const GetGoals=(company:string,accessToken:string) =>(dispatch:any)=>{
      dispatch({type:"GET_GOALS_INIT"})

      Api.GetGoals(company,accessToken).then(data=>{
        if(data?.status==200)
        {
          debugger
          dispatch({type:"GET_GOALS_SUCCESS",goals:data.data})
        }
        else{
          debugger
          dispatch({type:"GET_GOALS_ERROR",error:data?.data})
        }
      })
      .catch(error=>{
        if(error.message=="Network Error")
        dispatch({type:"GET_GOALS_ERROR",error:{message:"Network Error"}})
        else
        debugger
        dispatch({type:"GET_GOALS_ERROR",error:error.response?.data})
      }
    )
    .catch((error) => {
      if (error.message == 'Network Error')
        dispatch({
          type: 'GET_GOALS_ERROR',
          error: { message: 'Network Error' },
        });
      else debugger;
      dispatch({ type: 'GET_GOALS_ERROR', error: error.response?.data });
    });
};

export { GetGoals };
