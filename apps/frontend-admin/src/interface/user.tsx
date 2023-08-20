import { Role } from './role';

export interface UserAuthState {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  role: Role;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: any;
}

export interface CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
