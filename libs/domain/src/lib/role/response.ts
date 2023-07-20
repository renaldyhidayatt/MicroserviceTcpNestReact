import { Role } from './models';

export class RoleResponse {
  role_id: number;
  role: string;
  created_at: Date;
  updated_at: Date;

  constructor(role: Role) {
    this.role_id = role.role_id;
    this.role = role.role;
    this.created_at = role.created_at;
    this.updated_at = role.updated_at;
  }
}
