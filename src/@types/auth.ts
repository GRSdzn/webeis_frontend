import { MenuData } from '@/store/slices/auth/user.types';

export type SignInCredential = {
  username: string;
  password: string;
};

export type ForgotPasswordReq = {
  email: string;
};

export interface SignInResponse {
  menu_data: MenuData[];
  user: {
    token: string;
    uuid: string;
    username: string;
  };
}

export interface ResponseInfoObject {
  status: 'success' | 'failed';
  error_code?: number;
  message?: string;
}

// export type SignUpResponse = SignInResponse

// export type SignUpCredential = {
//   name: string
//   username: string
//   password: string
// }
