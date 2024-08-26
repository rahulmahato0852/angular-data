import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { POSTS } from '../type/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  private BASEURL = "http://localhost:5000/"


  getPosts(page: number, searchVal: string): Observable<{ message: string, result: POSTS[], count: number }> {
    return this.http.get<{ message: string, result: POSTS[], count: number }>(this.BASEURL, {
      withCredentials: true,
      params: { page, searchVal }
    })
  }

  addPosts(data: POSTS): Observable<{
    message: string,
    result: POSTS
  }> {
    console.log("called", "service");

    return this.http.post<{ message: string, result: POSTS }>(this.BASEURL, data, { withCredentials: true })
  }


  deletePosts(id: string): Observable<{
    message: string,
  }> {
    return this.http.delete<{ message: string }>(this.BASEURL + id, { withCredentials: true })
  }

  updatePosts(id: string, data: POSTS): Observable<{
    message: string,
  }> {
    return this.http.put<{ message: string }>(this.BASEURL + id, data, { withCredentials: true })
  }



}
