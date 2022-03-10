import Api from "renderer/Api/auth.api";


const getMembers=(company:string,accessToken:string) =>async(dispatch:any)=>{

      dispatch({type:"GET_MEMBERS_INIT"})

      const MembersData=await Api.GetMembers(company,accessToken).then((MembersData:any)=>{
         ;
        if(MembersData?.data?.status==200)
        {
          dispatch({type:"GET_MEMBERS_SUCCESS",members:MembersData.data.members})
        }
        else{

            dispatch({type:"GET_MEMBERS_ERROR",error:{message:MembersData?.message}})

        }
      })
      .catch((error:any)=>{
        if(error.message=="Network Error")
        dispatch({type:"GET_MEMBERS_ERROR",error:{message:"Network Error"}})
        else
        dispatch({type:"GET_MEMBERS_ERROR",error:error.response?.data})
      })



}



export {
  getMembers,
}
