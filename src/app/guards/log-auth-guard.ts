import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const logAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('LoginUsers') !== null;

  if (!isLoggedIn) {
    return true;
  } else {
    router.navigate(['/home']);
    alert('You have already logged in')
    return false;
  }
};
