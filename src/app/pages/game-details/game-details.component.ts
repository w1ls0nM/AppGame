import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDetails } from '../../Models/game-details';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../notification.service';
import { List } from '../../Models/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  
  lists: any[] = [];
  errorMessage: string = '';
  showMoveOptions: { [gameId: string]: boolean } = {};

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute
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

    this.apiService.getProfile().subscribe(profile => {
      this.lists = profile.lists;
    });
  }

  toggleDropdown(dropdownType: string): void {
    if (dropdownType === 'add') {
      this.dropdownVisibilityAdd = !this.dropdownVisibilityAdd;
      this.dropdownVisibilityMove = false;
    } else if (dropdownType === 'move') {
      this.dropdownVisibilityMove = !this.dropdownVisibilityMove;
      this.dropdownVisibilityAdd = false;
    }
  }

  toggleMoveOptions(): void {
    this.showMoveOptions[this.gameDetails.id] = !this.showMoveOptions[this.gameDetails.id];
  }

  addToMyList(listId: string): void {
    if (this.gameDetails) {
      const gameAlreadyInList = this.lists.some(list => list.gamesIds.includes(this.gameDetails!.id));
  
      if (gameAlreadyInList) {
        this.notificationService.showError( 'This game is already in another list. A game can only appear in one list.');
        return;
      }
  
      const updatedList = this.lists.find(list => list.id === listId);
      if (updatedList) {
        updatedList.gamesIds.push(this.gameDetails.id);

      this.apiService.getProfile().subscribe(profile => {
        profile.lists = this.lists;  

        
        this.apiService.updateProfile(profile).subscribe(response => {
          this.notificationService.showSuccess('Game added successfully');
          this.dropdownVisibilityAdd = false;
          this.errorMessage = '';
        });
      });
    }
  } else {
    this.notificationService.showError('No game selected');
  }
  }

  getAvailableLists(): List[] {
    return this.lists.filter(list => list.gamesIds.indexOf(this.gameDetails.id) === -1 && list.id !== this.lists); 
  }

  moveGameToList(listId: string): void{

      this.apiService.getProfile().subscribe(profile => {
      const targetList = profile.lists.find((list: any) => list.id === listId);
      const previousList = profile.lists.find((list: any) => list.gamesIds.includes(this.gameDetails.id));
      
      
      if (targetList && previousList) {
        previousList.gamesIds = previousList.gamesIds.filter((id: string) => id !== this.gameDetails.id); 
        targetList.gamesIds.push(this.gameDetails.id); 
    
        this.apiService.updateProfile(profile).subscribe(() => {
          this.notificationService.showSuccess('Game moved successfully!');
          this.dropdownVisibilityMove = false;
          this.showMoveOptions[this.gameDetails.id] = false;
          window.location.reload();
        });
      }else{
        this.notificationService.showError('Unable to move the game. Please try again.');
      }
    });
  }

  removeGameFromList(){
    this.apiService.getProfile().subscribe(profile => {
      const currentList = profile.lists.find((list: any) => list.gamesIds.includes(this.gameDetails.id));
      
      if (currentList) {
        currentList.gamesIds = currentList.gamesIds.filter((id: string) => id !== this.gameDetails.id);  
      
        this.apiService.updateProfile(profile).subscribe(() => {
          this.notificationService.showSuccess('Game removed successfully!');
          window.location.reload();
        });
      }else{
        this.notificationService.showError('Unable to move the game. Please try again.');
      }
    });
  }
}
