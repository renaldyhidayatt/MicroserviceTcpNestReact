import { UserState } from './user';

export interface AuthState {
  token: string | null;
  user: UserState | any;
  loading: boolean;
  error: any;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
