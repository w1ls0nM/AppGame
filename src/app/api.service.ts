import { Injectable } from '@angular/core';
import { Game } from './Models/game'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private list: Array<Game> = [];

  constructor(private http: HttpClient) {
    console.log('AnimaisService.constructor')
  }

  getGamesList(): Observable<any>{
    return this.http.get('http://localhost:3000/gamesList',)
  }

  getDetailsID(id: string): Observable<any>{
    return this.http.get('http://localhost:3000/gameDetails/' + id);
  }
}
