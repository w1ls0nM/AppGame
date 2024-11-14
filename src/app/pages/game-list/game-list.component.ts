import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  games: Array<any> = [];
  searchQuery: any;
  filteredGames: Array<any> = [];

  constructor(private apiService: ApiService){  }

  ngOnInit(){
    this.apiService.getGamesList().subscribe({
      next:(data) => {
      console.log(data);
      this.games = data;
      this.filteredGames = data;
    },
    error: (error) => {
      console.error('Algo correu mal:', error);
    }
    })
  }
  filterResults(text: string){
    if (!text) {
      this.filteredGames = this.games;
      return;
    }
    this.filteredGames = this.games.filter((game) =>
      game?.title.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
