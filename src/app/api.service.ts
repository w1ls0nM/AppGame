import { Injectable } from '@angular/core';
import { Game } from './Models/game'
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getListById(listId: string) {
    throw new Error('Method not implemented.');
  }

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

  getProfile(): Observable<any> {
    return this.http.get('http://localhost:3000/profile'); 
  }

  getListGames(listId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/lists/${listId}/games`);
  }

  getGamesByIds(gameIds: string[]): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/gamesList').pipe(
      map((gamesList: any[]) => gamesList.filter(game => gameIds.includes(game.id)))
    );
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put('http://localhost:3000/profile', profile); // Assuming PUT request to update the profile
  }
  
}
