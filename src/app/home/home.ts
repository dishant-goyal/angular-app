import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginInt } from '../interface/user-i';
import { BlogService } from '../service/blog-service';
import { BlogInt } from '../interface/blog-int';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet,NgFor],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  loggedUser: LoginInt | undefined;
  blogArray:BlogInt[]=[];
  constructor(private router: Router, private BlgS: BlogService) {
    const localUser = localStorage.getItem('LoginUsers');
    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }
  ngOnInit() {
    this.getAllB();
  }
  onLogout() {
    localStorage.removeItem('LoginUsers');
    this.router.navigateByUrl('/login').then(()=>{
      window.location.reload();
    })
  }
  getAllB() {
    this.BlgS.getAllData().subscribe((data: BlogInt[]) => {
      this.blogArray=data;
    })
  }
  notlg(){
    alert('Login First!')
  }
}
