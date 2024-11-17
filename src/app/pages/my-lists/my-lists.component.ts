import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Game } from '../../Models/game';
import { CommonModule } from '@angular/common';
import { RedirectCommand } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-lists.component.html',
  styleUrl: './my-lists.component.scss'
})
export class MyListsComponent  implements OnInit{
  lists: any[] = [];
  

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProfile().subscribe(profile => {
      this.lists = profile.lists;
    });
  }

  viewGames(listId: string): void {
    this.router.navigate(['/my-list-details'], {
      queryParams: { listId }
      
    }
    
  );
  }
  
}
