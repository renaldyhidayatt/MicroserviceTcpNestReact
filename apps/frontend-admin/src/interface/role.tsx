export interface Role {
  role_id: number;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface RolesState {
  selectedRole: Role | null;
  roles: Role[];
  loading: boolean;
  error: any;
}

export interface CreateRole {
  role: string;
}
