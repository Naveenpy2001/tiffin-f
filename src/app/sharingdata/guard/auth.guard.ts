import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RegistrationService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(RegistrationService);
  const user = userService.currentUser;

  if (user && user.token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
