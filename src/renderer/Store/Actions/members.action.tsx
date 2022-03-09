import Api from "renderer/Api/auth.api";


const getMembers=(company:string,accessToken:string) =>async(dispatch:any)=>{
  debugger;
      dispatch({type:"GET_MEMBERS_INIT"})

      const MembersData=await Api.GetMembers(company,accessToken)
      .catch(error=>{
        dispatch({type:"GET_MEMBERS_ERROR",error:error.response?.data})
      })
      debugger;
      console.log(MembersData);
      if(MembersData?.data?.status==200)
        {
          dispatch({type:"GET_MEMBERS_SUCCESS",members:MembersData.data.members})
        }
        else{
          dispatch({type:"GET_MEMBERS_ERROR",error:MembersData?.data})
        }
}



export {
  getMembers,
}
