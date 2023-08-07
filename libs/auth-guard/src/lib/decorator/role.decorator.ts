import { SetMetadata } from '@nestjs/common';

export const RoleDecorator = (role: string) => SetMetadata('role', role);
