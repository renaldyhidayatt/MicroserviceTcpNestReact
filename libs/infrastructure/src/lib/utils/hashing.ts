import * as bcrypt from 'bcryptjs';

export class PasswordHash {
  hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 12);
  };

  correctPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  };
}
