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

  dropdownVisibilityAdd: boolean = false;
  dropdownVisibilityMove: boolean = false;

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

  toggleDropdown(dropdownType: string): void {
    if (dropdownType === 'add') {
      this.dropdownVisibilityAdd = !this.dropdownVisibilityAdd;
      this.dropdownVisibilityMove = false; // Close the other dropdown
    } else if (dropdownType === 'move') {
      this.dropdownVisibilityMove = !this.dropdownVisibilityMove;
      this.dropdownVisibilityAdd = false; // Close the other dropdown
    }
  }

  addToMyList(category: string): void {
    console.log("add "+this.gameDetails.id+" to list: "+category);
  }

  moveGameToList(category: string): void{
    console.log("move "+this.gameDetails.id+" to list: "+category);
  }

  removeGameFromList(){
    console.log("remove from list: "+ this.gameDetails.id)
  }
}
