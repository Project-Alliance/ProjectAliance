import {NOTIFICATION_TYPE, Store,} from 'react-notifications-component';


export const Notification=(title:string,message:string,type:NOTIFICATION_TYPE)=>{


    Store.addNotification({
      title: title||"Wonderful!",
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__bounceIn"],
      animationOut: ["animate__animated", "animate__bounceOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      showIcon: true,
      pauseOnHover: true,
      }
    });

}
