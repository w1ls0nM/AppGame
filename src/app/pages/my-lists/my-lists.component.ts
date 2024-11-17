import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Game } from '../../Models/game';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-lists.component.html',
  styleUrl: './my-lists.component.scss'
})
export class MyListsComponent implements OnInit {
  lists: any[] = [];
  randomGames: Game[] = [];
  selectedGame: Game | null = null;
  dropdownVisible: boolean = false;
  listIdToAddTo: string | null = null;
  errorMessage: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProfile().subscribe(profile => {
      this.lists = profile.lists;
      this.loadRandomGames(profile.lists);
    });
  }

  loadRandomGames(lists: any[]): void {
    this.apiService.getGamesList().subscribe(allGames => {
      const gamesInLists = lists.flatMap(list => list.gamesIds);
      const availableGames = allGames.filter((game: { id: any; }) => !gamesInLists.includes(game.id));
      this.randomGames = this.getRandomGames(availableGames, 6);
    });
  }

  getRandomGames(games: any[], numberOfGames: number): Game[] {
    const shuffled = [...games].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfGames);
  }

  viewGames(listId: string): void {
    this.router.navigate(['/my-list-details'], {
      queryParams: { listId }
    });
  }

  toggleDropdown(game: Game): void {
    if (this.selectedGame === game) {
      this.dropdownVisible = !this.dropdownVisible;
    } else {
      this.selectedGame = game;
      this.dropdownVisible = true;
    }
    this.errorMessage = '';
  }

  categoryImage(list: any): string {
    switch (list.name) {
      case 'Play Later': return 'https://images.pexels.com/photos/599705/pexels-photo-599705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case 'Currently Playing': return 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case 'Played': return 'https://images.pexels.com/photos/8850709/pexels-photo-8850709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case 'Completed': return 'https://images.pexels.com/photos/20279300/pexels-photo-20279300/free-photo-of-a-digital-3d-illustration-of-a-checklist.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      default: return 'https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    }
  }

  addGameToList(listId: string): void {
    if (this.selectedGame) {
      const gameAlreadyInList = this.lists.some(list => list.gamesIds.includes(this.selectedGame!.id));
  
      if (gameAlreadyInList) {
        this.errorMessage = `This game is already in another list. A game can only appear in one list.`;
        return;
      }
  
      const updatedList = this.lists.find(list => list.id === listId);
      if (updatedList) {
        updatedList.gamesIds.push(this.selectedGame.id);

      this.apiService.getProfile().subscribe(profile => {
        profile.lists = this.lists;  

        
        this.apiService.updateProfile(profile).subscribe(response => {
          console.log('Game added successfully:', response);
          this.dropdownVisible = false;
          this.selectedGame = null;
          this.errorMessage = '';
        });
      });
    }
  } else {
    console.error('No game selected');
  }
  }
}
