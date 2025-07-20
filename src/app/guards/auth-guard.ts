import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localuser=localStorage.getItem('LoginUsers');
  if(localuser!=null){
    return true;
  }
  else{
    alert('Login to unlock');
    return false;
  }
};
