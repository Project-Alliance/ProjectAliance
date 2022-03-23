
import { ChatEngine } from 'react-chat-engine';
import LoginForm from './LoginForm';
import ChatFeed from './ChatFeed';

import './App.css';

const Inbox = ({ParentHistory,sideBar}) => {

    return (
       <ChatEngine
           height= "100vh"
           projectID= "b8f6b621-092c-4471-a23a-ff6c98ba2646"
           userName= "Irtaza"
           userSecret="12345"
           renderChatFeed={ (chatAppProps) => <ChatFeed  {... chatAppProps} />}

       />
    )
    }

    export default Inbox;

