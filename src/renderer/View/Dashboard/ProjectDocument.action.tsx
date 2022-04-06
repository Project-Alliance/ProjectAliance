import Api from "renderer/Api/auth.api";


const SaveDocument=(company:string,accessToken:string) =>(dispatch:any)=>{
      dispatch({type:"SAVE_DOCUMENT_INIT"})

      Api.SaveDocumentToDatabase(company,accessToken).then(data=>{
        if(data?.status==200)
        {
          dispatch({type:"SAVE_DOCUMENT_SUCCESS",document:data.data})
        }
        else{
          dispatch({type:"SAVE_DOCUMENT_ERROR",error:data?.data})
        }
      })
      .catch(error=>{
        if(error.message=="Network Error")
        dispatch({type:"SAVE_DOCUMENT_ERROR",error:{message:"Network Error"}})
        else
        dispatch({type:"SAVE_DOCUMENT_ERROR",error:error.response?.data})
      }

      )
}

const GetDocument=(id:string,accessToken:string) =>(dispatch:any)=>{
  dispatch({type:"GET_DOCUMENT_INIT"})

  Api.GetDocument(id,accessToken).then(data=>{

    if(data?.status==200)
    {

      dispatch({type:"GET_DOCUMENT_SUCCESS",document:data.data})
    }
    else{
      dispatch({type:"GET_DOCUMENT_ERROR",error:data?.data})
    }
  })
  .catch(error=>{
    if(error.message=="Network Error")
    dispatch({type:"GET_DOCUMENT_ERROR",error:{message:"Network Error"}})
    else
    dispatch({type:"GET_DOCUMENT_ERROR",error:error.response?.data})
  }

  )
}
export {SaveDocument,GetDocument};
