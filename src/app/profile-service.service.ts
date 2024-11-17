import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from './Models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(private httpClient: HttpClient) {
  }

  getProfile(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/profile')
  }

  updateAnimal(id: String|undefined, profile: Profile): Observable<any>{
    return this.httpClient.put('http://localhost:3000/profile' + id, profile)
  }
}
