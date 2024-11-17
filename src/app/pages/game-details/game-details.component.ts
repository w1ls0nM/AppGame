import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { GameDetails } from '../../Models/game-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent {

  gameDetails: GameDetails = {
    id: '',
    title: '',
    thumbnail: '',
    status: '',
    shortDescription: '',
    description: '',
    gameUrl: '',
    genre: '',
    platform: '',
    publisher: '',
    developer: '',
    releaseDate: '',
    freetogameProfileUrl: '',
    minimumSystemRequirements: {
      os: '',
      processor: '',
      memory: '',
      graphics: '',
      storage: ''
    },
    screenshots: [{
      id: '',
      image: ''
    }]
  };
  id: string="";
  roulette: Array<any> = [];

  categories = ['Play Later', 'Currently Playing', 'Played', 'Completed'];

  dropdownVisibility!: boolean;

  constructor(
    private apiService: ApiService,
    private router: Router
  ){}
  
  ngOnInit(){
    this.id = this.router.url.replace("/gameDetails/", "");
    this.apiService.getDetailsID(this.id).subscribe({
      next:(data) => {
        console.log(data);
        this.gameDetails = data;
        this.roulette = this.gameDetails.screenshots;
      },
    })
  }

  toggleDropdown(): void {
    this.dropdownVisibility = !this.dropdownVisibility;
  }

  addToMyList(category: string): void {
    console.log("add to list: "+category);
  }
}
