import PropTypes from "prop-types"
import React, { useEffect, useState } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useSelector } from 'react-redux'
import { selectUser } from 'renderer/View/Email/features/userSlice'
import Api from "renderer/Api/auth.api"

interface commentType{
  userId: string
  comId: string
  avatarUrl: string
  userProfile?: string
  fullName: string
  text: string
  replies: any
}
interface commentReplyType {
  userId: string
  parentOfRepliedCommentId: string
  repliedToCommentId: string
  avatarUrl: string
  userProfile?: string
  fullName: string
  text: string
  comId:string
}
const CustomComponent = ({reqId}:{reqId:number}) => {
  const [data, setData] = useState([])
const user = useSelector(selectUser)

  const handleSubmit = async (comment: commentType) => {
   let res = await Api.Addcomment(reqId,{text:comment.text},user.accessToken).catch(err=>{
    console.log(err)
  });
   if(res?.status==200)
   {
    getComments
   }
  }
  const handleReplySubmit = async (comment: commentReplyType) => {
    console.log(comment)
    let res = await Api.AddReply(comment.repliedToCommentId,{text:comment.text},user.accessToken).catch(err=>{
      console.log(err)
    });
     if(res?.status==200)
     {
      getComments
     }
  }
  const getComments= async () =>{
    let res= await Api.GetComment(reqId,user?.accessToken).catch(err=>{
      console.log(err)
    });
    if(res?.status==200){

      setData(res.data);
    }
  }

   useEffect(() => {
    let intervalget= setInterval(()=>{
      getComments()
    },3000)

    return () => {
      clearInterval(intervalget)
    };
  }, [])
  return <CommentSection
        currentUser={{
          currentUserId: ''+user.id,
          currentUserImg:user.profilePic,
          currentUserProfile:'https://www.github.com/Rehan-05',
          currentUserFullName: user.name,
        }}
        logIn={{
            loginLink: 'http://localhost:3001/',
            signupLink: 'http://localhost:3001/'
          }}
        hrStyle={{ border: '0.5px solid #ff0072',backgroundColor: 'green',weight:100 }}
        titleStyle={{ color: '#f2f2f2', fontSize: '1rem' }}
        commentsCount={data.length}
        commentData={data}
        imgStyle={{ borderRadius: '0%',height:50,width:50 }}
        customImg={user.profilePic}
        inputStyle={{ border: '1px solid rgb(208 208 208)',width:160 }}
        formStyle={{ width:320, }}
        submitBtnStyle={{ backgroundColor: '#007FFF', color: 'Black',fontSize:12, width: 70,
        height: 30, }}
        cancelBtnStyle={{
          backgroundColor: '#007FFF',
          marginLeft:10,
          width: 70,
          height: 30,
          color: 'Black',
          fontSize:8
        }}

        removeEmoji={true}
        overlayStyle={{ backgroundColor: '#0f0d29', color: 'white',height:'82vh',overflow:'hidden',overflowY:'scroll',"::-webkitScrollbar":{display:'none'} }}
        replyInputStyle={{ borderBottom: '1px solid black', color: 'black' }}
        onSubmitAction={handleSubmit}
        onReplyAction={handleReplySubmit}

      />
}

CustomComponent.propTypes = {
  reqId: PropTypes.any
}

export default CustomComponent
