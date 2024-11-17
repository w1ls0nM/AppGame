import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../Models/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { List } from '../../Models/list';
import { Profile } from '../../Models/profile'; 
import { NotificationService } from '../../notification.service';
import { Route } from '@angular/router';


@Component({
  selector: 'app-my-list-details',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './my-list-details.component.html',
  styleUrls: ['./my-list-details.component.scss']
})
export class MyListDetailsComponent implements OnInit {

  listId!: string;
  games: any[] = [];
  lists: any[] = []; 
  showMoveOptions: { [gameId: string]: boolean } = {}; 
  currentListName: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,private notificationService: NotificationService) {}

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
    return this.lists.filter(list => list.gamesIds.indexOf(gameId) === -1 && list.id !== this.listId); 
  }


   removeGameFromList(gameId: string): void {
    this.apiService.getProfile().subscribe(profile => {
      const selectedList = profile.lists.find((list: any) => list.id === this.listId);
      
      if (selectedList) {
        selectedList.gamesIds = selectedList.gamesIds.filter((id: string) => id !== gameId); 
        
      
        this.apiService.updateProfile(profile).subscribe(() => {
          if (selectedList.gamesIds.length === 0) {
           
            this.router.navigate(['my-lists']);
          } else {
            
            this.loadListDetails();
          }
        });
      }
    });
    this.notificationService.showSuccess('Game removed from list successfully!');
  }


  moveGameToList(gameId: string, targetListId: string): void {
    this.apiService.getProfile().subscribe(profile => {
      const selectedList = profile.lists.find((list: any) => list.id === this.listId);
      const targetList = profile.lists.find((list: any) => list.id === targetListId);
  
      if (selectedList && targetList) {
        
        selectedList.gamesIds = selectedList.gamesIds.filter((id: string) => id !== gameId); 
       
        targetList.gamesIds.push(gameId); 
  
        
        this.apiService.updateProfile(profile).subscribe(() => {
          if (selectedList.gamesIds.length === 0) {
           
            this.router.navigate(['my-lists']);
          } else {
            
            this.loadListDetails();
          }
         
          this.notificationService.showSuccess('Game moved successfully!');
        });
      }
    });
  }
  

toggleMoveOptions(gameId: string): void {
  this.showMoveOptions[gameId] = !this.showMoveOptions[gameId];
}

}
