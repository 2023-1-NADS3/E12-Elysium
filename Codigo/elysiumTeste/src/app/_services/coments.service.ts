import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coments } from '../_models/Coments';

const url = 'http://localhost:8080/api/coments';

@Injectable({
  providedIn: 'root'
})
export class ComentsService {

  constructor(private http: HttpClient) { }

  getComents(id: any): Observable<any[]>{
    return this.http.get<any[]>(url + "/" + id);
  }

  createComent(data: any): Observable<any>{
    return this.http.post(url, data)
  }

  updateComent(id: any, data: any): Observable<any>{
    return this.http.put(url + "/" + id, data)
  }

  deleteComent(id: any): Observable<any>{
    return this.http.delete(url + "/" + id)
  }

}