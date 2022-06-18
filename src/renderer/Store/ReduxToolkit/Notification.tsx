import { createSlice } from "@reduxjs/toolkit";
import { type } from "os";
export const NotificationSlice= createSlice({
  name: "notification",
  initialState: {
    mailReceived: false,
    onLogin: false,
    onPasswordChanged: false,
    onProjectCreated: false,
  },
  reducers: {
    toggleMailReceived: (state) => {
      state.mailReceived = !state.mailReceived;
    },
    toggleOnLogin: (state) => {
      state.onLogin = !state.onLogin;
    },
    toggleOnPasswordChanged: (state) => {
      state.onPasswordChanged = !state.onPasswordChanged;
    },
    toggleOnProjectCreated: (state) => {
      state.onProjectCreated = !state.onProjectCreated;
    },
    setAllas: (state,action) => {
      state.mailReceived = action.payload.mailReceived;
      state.onLogin = action.payload.onLogin;
      state.onPasswordChanged = action.payload.onPasswordChanged;
      state.onProjectCreated = action.payload.onProjectCreated;
    }
  }

})

export const { toggleMailReceived, toggleOnLogin, toggleOnPasswordChanged, toggleOnProjectCreated,setAllas } = NotificationSlice.actions;

export type NotificationState = {
  mailReceived: boolean,
  onLogin: boolean,
  onPasswordChanged: boolean,
  onProjectCreated: boolean,
};

export type notify={
  notification:NotificationState
}

export const selectMailReceived = ({notification}:notify) => notification.mailReceived;
export const selectOnLogin = ({notification}:notify) => notification.onLogin;
export const selectOnPasswordChanged = ({notification}:notify) => notification.onPasswordChanged;
export const selectOnProjectCreated = ({notification}:notify) => notification.onProjectCreated;

export default NotificationSlice.reducer;
