export interface IFormInput {
  Email?: string;
  Password?: string;
  userName?: string;
  name?: string;
  rememberme?: number;
}


export interface auth{
  user: any;
  isChecking: boolean;
  login: {
      isChecking: boolean;
      error: any;
  },
  register: {
      isChecking: boolean;
      error: any;
  }
}

export interface AUTH{
  auth:auth
  }
