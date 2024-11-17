import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../Models/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { List } from '../../Models/list';
import { Profile } from '../../Models/profile';  // Assuming Profile is the model for profile data

@Component({
  selector: 'app-my-list-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-list-details.component.html',
  styleUrls: ['./my-list-details.component.scss']
})
export class MyListDetailsComponent implements OnInit {

  listId!: string;
  games: any[] = [];
  lists: any[] = []; 
  showMoveOptions: { [gameId: string]: boolean } = {}; 
  currentListName: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params => {
      this.listId = params['listId'];
      if (this.listId) {
        this.loadListDetails();
      }
    });
  }

  

  loadListDetails(): void {
    
    this.apiService.getProfile().subscribe(profile => {
      const selectedList = profile.lists.find((list: any) => list.id === this.listId);
      this.lists = profile.lists;

      if (selectedList) {
        this.currentListName = selectedList.name;
        this.apiService.getGamesByIds(selectedList.gamesIds).subscribe(games => {
          this.games = games;
        });
      }
    });
  }

  getAvailableLists(gameId: string): List[] {
    return this.lists.filter(list => list.gamesIds.indexOf(gameId) === -1 && list.id !== this.listId); // Exclude current list
  }


   removeGameFromList(gameId: string): void {
    this.apiService.getProfile().subscribe(profile => {
      const selectedList = profile.lists.find((list: any) => list.id === this.listId);
      
      if (selectedList) {
        selectedList.gamesIds = selectedList.gamesIds.filter((id: string) => id !== gameId); // Remove the game by its ID
        
      
        this.apiService.updateProfile({ lists: profile.lists }).subscribe(() => {
          this.loadListDetails();
        });
      }
    });
  }


 moveGameToList(gameId: string, targetListId: string): void {
  this.apiService.getProfile().subscribe(profile => {
    const selectedList = profile.lists.find((list: any) => list.id === this.listId);
    const targetList = profile.lists.find((list: any) => list.id === targetListId);

    if (selectedList && targetList) {
      selectedList.gamesIds = selectedList.gamesIds.filter((id: string) => id !== gameId); 
      targetList.gamesIds.push(gameId); 

  
      this.apiService.updateProfile({ lists: profile.lists }).subscribe(() => {
        this.loadListDetails(); 
      });
    }
  });
}

toggleMoveOptions(gameId: string): void {
  this.showMoveOptions[gameId] = !this.showMoveOptions[gameId];
}

}
