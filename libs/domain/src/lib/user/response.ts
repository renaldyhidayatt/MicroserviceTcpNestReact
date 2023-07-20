import { Role } from '../role';
import { User } from '../user';

export class UserResponse {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  role: Role;
  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this.user_id = user.user_id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.image = user.image;
    this.role = user.role;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
