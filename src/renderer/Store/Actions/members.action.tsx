import Api from "renderer/Api/auth.api";


const getMembers=(company:string,accessToken:string) =>async(dispatch:any)=>{

      dispatch({type:"GET_MEMBERS_INIT"})

      Api.GetMembers(company,accessToken).then((MembersData:any)=>{

        if(MembersData?.data?.status==200)
        {dispatch({type:"GET_MEMBERS_SUCCESS",members:MembersData.data.members})}
        else{dispatch({type:"GET_MEMBERS_ERROR",error:{message:MembersData?.message}})}})
      .catch((error:any)=>{
        if(error.message=="Network Error")
        dispatch({type:"GET_MEMBERS_ERROR",error:{message:"Network Error"}})
        else
        dispatch({type:"GET_MEMBERS_ERROR",error:error.response?.data})
      })
}

const deleteMembers=(id:number,accessToken:string) =>async(dispatch:any)=>{
debugger
  Api.deleteMembers(id,accessToken).then((result:any)=>{
    debugger
    console.log(id)
    if(result?.data?.status==200)
    {dispatch({type:"DELETE_MEMBERS_SUCCESS",members:{id:id}})}
    else{alert("ERROR" + result?.data?.message)}})
  .catch((error:any)=>{
    debugger
    if(error.message=="Network Error")
    alert("Can not Delete Due to Network Error")
    else
    alert("ERROR" + error.response?.data.message)})
}

const updateMembers=(company:number,accessToken:string) =>async(dispatch:any)=>{

  dispatch({type:"GET_MEMBERS_INIT"})

  Api.UpdateMembers(company,accessToken).then((MembersData:any)=>{

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
  deleteMembers,
  updateMembers
}
