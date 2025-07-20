import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { Home } from './home/home';
import { MyBlogs } from './my-blogs/my-blogs';
import { authGuard } from './guards/auth-guard';
import { logAuthGuard } from './guards/log-auth-guard';
export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'login',component:LoginPage,canActivate:[logAuthGuard]},
    {path:'home',component:Home},
    {path:'myblogs',component:MyBlogs,canActivate:[authGuard]},
    {path:'**',redirectTo:'/home',pathMatch:'full'}
];
