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

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch the query parameter for listId
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

      if (selectedList) {
        
        this.apiService.getGamesByIds(selectedList.gamesIds).subscribe(games => {
          this.games = games;
        });
      }
    });
  }
}
