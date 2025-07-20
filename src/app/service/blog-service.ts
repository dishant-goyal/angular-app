import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogInt } from '../interface/blog-int';
import { of } from 'rxjs';
import { LoginInt } from '../interface/user-i';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  user: LoginInt={
    "email":"",
    "passward":""
  };
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('LoginUsers');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser) as LoginInt;
    }

  }
  url = "http://localhost:3000/Blogs";
  getAllData(): Observable<BlogInt[]> {
    return this.http.get<BlogInt[]>(this.url)
  }
  
  // user: BlogInt | undefined;
  // url = 'https://your-api.com/blogs'; // Replace with your real URL

  getUserData(): Observable<BlogInt[]> {
    if (!this.user) return of([]);

    return this.http.get<BlogInt[]>(`${this.url}?username=${this.user.email}`);
  }

  postBlog(Blog:BlogInt):Observable<BlogInt>{
    Blog.username=this.user?.email;
    return this.http.post<BlogInt>(this.url,Blog)
  }

  // blog.service.ts
deleteBlog(bId: string): Observable<BlogInt> {
  return this.http.delete<BlogInt>(`${this.url}/${bId}`);
}
getUser(bId:string):Observable<BlogInt>{
  return this.http.get<BlogInt>(`${this.url}/${bId}`);
}

updateBlog(blg:BlogInt){
  return this.http.put<BlogInt>(`${this.url}/${blg.id}`,blg)
}

}
