import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Game } from '../../Models/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-lists.component.html',
  styleUrl: './my-lists.component.scss'
})
export class MyListsComponent  implements OnInit{
  gamesList: Game[] = [];

categories = ['Play Later', 'Currently Playing', 'Played', 'Completed'];

dropdownVisibility: { [key: string]: boolean } = {};

categorizedGames: { [category: string]: Game[] } = {
  'Play Later': [],
  'Currently Playing': [],
  'Played': [],
  'Completed': []
};


  randomGames: Game[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    const savedGamesList = localStorage.getItem('myGamesList');
    if (savedGamesList) {
      this.gamesList = JSON.parse(savedGamesList);
      this.selectRandomGames(); 
    } else{
      this.apiService.getGamesList().subscribe(
        (data: Game[]) => {
          this.gamesList = data;
          this.selectRandomGames();
        },
        (error: any) => {
          console.error('Error fetching games list', error);
        }
      );
    }

    const savedCategorizedGames = localStorage.getItem('categorizedGames');
    if (savedCategorizedGames) {
      this.categorizedGames = JSON.parse(savedCategorizedGames);
    }
  }

  addToMyList(game: Game, category: string): void {
    game.category = category;
    console.log(`Game "${game.title}" added to list "${category}".`);

    if (!this.categorizedGames[category].includes(game)) {
      this.categorizedGames[category].push(game);
    }

   
  localStorage.setItem('categorizedGames', JSON.stringify(this.categorizedGames));
  
   localStorage.setItem('myGamesList', JSON.stringify(this.gamesList));
  }

  toggleDropdown(gameId: string): void {
    this.dropdownVisibility[gameId] = !this.dropdownVisibility[gameId];
  }

  selectRandomGames(): void {
   
    const unlistedGames = this.gamesList.filter(game => {
      return !Object.values(this.categorizedGames).some(category => category.includes(game));
    });

  
    this.randomGames = this.shuffle(unlistedGames).slice(0, 6);
  }

  
  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }
  

  categoryImage(category: string): string {
    switch (category) {
      case 'Play Later': return 'https://images.pexels.com/photos/599705/pexels-photo-599705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case 'Currently Playing': return 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case 'Played': return 'https://images.pexels.com/photos/8850709/pexels-photo-8850709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case 'Completed': return 'https://images.pexels.com/photos/20279300/pexels-photo-20279300/free-photo-of-a-digital-3d-illustration-of-a-checklist.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      default: return 'https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    }
  }
  

  
  showListDetails(category: string) {
    console.log('Show details for:', category);
   
  }

  clearLocalStorage() {
    localStorage.clear();
    alert('Local Storage has been cleared!');
  }

}
