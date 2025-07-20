import { Component } from '@angular/core';
import { BlogService } from '../service/blog-service';
import { FormsModule, NgForm } from '@angular/forms';
import { BlogInt } from '../interface/blog-int';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-my-blogs',
  imports: [FormsModule],
  templateUrl: './my-blogs.html',
  styleUrl: './my-blogs.css'
})
export class MyBlogs {
  username = '';
  constructor(private myBs: BlogService) {
    const localuser = localStorage.getItem('LoginUsers');
    if (localuser != null) {
      const user=JSON.parse(localuser);
      this.username=user.email;
    }
    this.getUserB();
  }
  tempBlog:BlogInt|undefined;
  newBlog: BlogInt | undefined;
  allBlogs:BlogInt[]=[];

  ngOnInit(){
    this.getUserB();
  }
  getUserB() {
    this.myBs.getUserData().subscribe((data) => {
      // console.log(data);
      this.allBlogs=data;
    })
  
  }
  getData(Blog: BlogInt, BlogForm: NgForm) {
    // console.log(Blog);
    this.newBlog = Blog;
    this.newBlog.username = this.username;
    this.myBs.postBlog(Blog).subscribe((data) => {
      // console.log(data);
      alert('Posted successfully');
      this.getUserB();
      BlogForm.reset();
      this.tempBlog=undefined;
    })
    
  }
  delBlog(bId:string){
    this.myBs.deleteBlog(bId).subscribe((data)=>{
      console.log(data);
      this.getUserB();
    })
    this.getUserB();
  }
  isUp=false;
  getUser(bId:string){
    this.myBs.getUser(bId).subscribe((data)=>{
      // console.log(data);
      this.tempBlog=data;
      this.isUp=true;
    })
    
  }

  updateData(blg:BlogInt,blogform:NgForm){
    
    if(this.tempBlog){
      const bg={...blg,id:this.tempBlog?.id,username:this.username}
       this.myBs.updateBlog(bg).subscribe((data)=>{
      console.log(data);
    })
    alert('Update Succesfully')
    this.getUserB();
    blogform.reset();
      this.tempBlog=undefined;
      this.isUp=false;
    } 
   
  }
  assignDef(){
    this.isUp=false
    this.tempBlog={
      blogname:"Sample Blogs",
      title:"How a user can create Blogs",
      tags:"New Blogs",
      id:"",
      username:"",
      about:"First a user need to make an account. Then user have to login on the webpage and Then it is able to create blogs.A user can read blogs in the form section",
      date:new Date
    }

  }

}
