
import { ChatEngine } from 'react-chat-engine';
import LoginForm from './LoginForm';
import ChatFeed from './ChatFeed';

import './App.css';

const Inbox = ({ParentHistory,sideBar}) => {

    return (
       <ChatEngine
           height= "100vh"
           userName='azeem'
           userSecret='a79eedb8-bf3b-4681-809a-8d484c3b117d'
           projectID='a79eedb8-bf3b-4681-809a-8d484c3b117d'
           renderChatFeed={ (chatAppProps) => <ChatFeed  {... chatAppProps} />}

       />
    )
    }

    export default Inbox;

