import React, { useState } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'

const CustomComponent = () => {
  const [data, setData] = useState([
    {
      userId: '01a',
      comId: '012',
      fullName: 'Rehan Asghar',
      avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
      userProfile: 'https://www.github.com/Rehan-05',
      text: 'Hey, have you complete your work?',
      replies: [
        {
          userId: '02a',
          comId: '013',
          userProfile: 'https://www.github.com/Rehan-05',
          fullName: 'Azeem Sarwar',
          avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
          text: 'It took me 3 days to finish.Thanks! '
        }
      ]
    }
  ])

  return <CommentSection
        currentUser={{
          currentUserId: '01a',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.github.com/Rehan-05',
          currentUserFullName: 'Rehan Asghar',
        }}
        logIn={{
            loginLink: 'http://localhost:3001/',
            signupLink: 'http://localhost:3001/'
          }}
        hrStyle={{ border: '0.5px solid #ff0072',backgroundColor: 'green',weight:100 }}
        titleStyle={{ color: '#f2f2f2', fontSize: '1rem' }}
        commentsCount={8}
        commentData={data}
        imgStyle={{ borderRadius: '0%' }}
        customImg='https://ui-avatars.com/api/name=Riya&background=random'
        inputStyle={{ border: '1px solid rgb(208 208 208)',width:160 }}
        formStyle={{ width:320, }}
        submitBtnStyle={{ backgroundColor: '#007FFF', color: 'Black',fontSize:12 }}
        cancelBtnStyle={{
          backgroundColor: '#007FFF',
          marginLeft:10,
          width: 90,
          color: 'Black',
          fontSize:12
        }}
        removeEmoji={true}
        overlayStyle={{ backgroundColor: '#0f0d29', color: 'white', width:400,height:'100%' }}
        replyInputStyle={{ borderBottom: '1px solid black', color: 'black' }}
      />
}

export default CustomComponent
