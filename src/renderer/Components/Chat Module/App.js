
import { ChatEngine } from 'react-chat-engine';
import LoginForm from './components/LoginForm';
import ChatFeed from './components/ChatFeed';

import './App.css';

const App = () => {
    if(!localStorage.getItem('username')) return <LoginForm/>
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

    export default App;

