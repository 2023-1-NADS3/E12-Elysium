import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_models/Post';

const url = 'https://elysiuap-apitest2.onrender.com/api/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]>{
    return this.http.get<Post[]>(url)
  }

  get(id: any): Observable<Post>{
    return this.http.get<Post>(url + "/" + id)
  }

  create(data: any): Observable<any>{
    return this.http.post(url, data)
  }

  update(id: any, data: any): Observable<any>{
    return this.http.put(url + "/" + id, data)
  }

  delete(id: any): Observable<any>{
    return this.http.delete(url + "/" + id)
  }

  findByTitle(title: any): Observable<Post[]>{
    return this.http.get<Post[]>(`${url}?title=${title}`)
  }
}

