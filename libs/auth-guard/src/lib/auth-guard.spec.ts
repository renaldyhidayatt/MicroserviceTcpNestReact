import { authGuard } from './auth-guard';

describe('authGuard', () => {
  it('should work', () => {
    expect(authGuard()).toEqual('auth-guard');
  });
});
