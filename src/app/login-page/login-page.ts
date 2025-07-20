import { Component } from '@angular/core';
import { LoginInt } from '../interface/user-i';
import { RegisterI } from '../interface/register-i';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule,NgClass],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  makeloginV=false;
  loginObj:LoginInt={
    email:"",
    passward:""
  }
  registerObj:RegisterI={
    name:"",
    email:"",
    passward:""
  }
  regError=false;
  constructor(private router:Router){
  }
  onRegister(registerForm: NgForm) {
  const localUser = localStorage.getItem('UserData');
  let users = localUser ? JSON.parse(localUser) : [];

  const isPresent = users.some((u: any) => u.email === this.registerObj.email);

  if (isPresent) {
    this.regError = true;
  } else {
    users.push(this.registerObj);
    localStorage.setItem('UserData', JSON.stringify(users));
    alert('Register Successful');
    this.regError = false;
    registerForm.reset();
  }
}

  onLogin(loginForm:NgForm){
    const localUser=localStorage.getItem('UserData');
    if(localUser!=null){
      const user=JSON.parse(localUser);
      let isPresent=false;
      for(let u of user){
        if(u.email==this.loginObj.email && u.passward==this.loginObj.passward){
          isPresent=true;
          break;
        }
      }
      if(!isPresent){
        alert('Invalid Credentials');
        loginForm.reset();
      }
      else{
        alert('Login Successful');
        localStorage.setItem('LoginUsers',JSON.stringify(this.loginObj));
        // this.router.navigate(['/home'])
        this.router.navigateByUrl('/home')
      }
    }
    else{
      alert('Signup First')
      loginForm.reset();
    }
  }

}

