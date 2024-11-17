import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../Models/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-list-details',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './my-list-details.component.html',
  styleUrl: './my-list-details.component.scss'
})
export class MyListDetailsComponent implements OnInit {
  category: string = '';
  gamesInCategory: Game[] = [];
  filteredGames: Game[] = [];
  availableCategories: string[] = ['Play Later', 'Currently Playing', 'Played', 'Completed'];
  selectedCategory: string = '';
  dropdownVisible: { [gameId: string]: boolean } = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];

      const savedCategorizedGames = localStorage.getItem('categorizedGames');
      if (savedCategorizedGames) {
        const categorizedGames = JSON.parse(savedCategorizedGames);

        if (categorizedGames[this.category]) {
          this.gamesInCategory = categorizedGames[this.category];
          this.filteredGames = [...this.gamesInCategory];
        } else {
          console.warn('No games found for category:', this.category);
        }
      } else {
        console.warn('No categorized games found in local storage.');
      }

      
      this.availableCategories = this.availableCategories.filter(c => c !== this.category);
    });
  }

  filterResults(searchTerm: string): void {
    this.filteredGames = this.gamesInCategory.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  toggleCategorySelector(game: Game): void {
    
    this.dropdownVisible[game.id] = !this.dropdownVisible[game.id];
  }

  removeGame(game: Game): void {
    const index = this.gamesInCategory.indexOf(game);
    if (index > -1) {
      this.gamesInCategory.splice(index, 1);
      this.updateLocalStorage();
      this.filteredGames = [...this.gamesInCategory];
    }
  }

  moveGame(game: Game): void {
    if (!this.selectedCategory) {
      alert('Please select a category to move the game.');
      return;
    }

    const savedCategorizedGames = localStorage.getItem('categorizedGames');
    if (savedCategorizedGames) {
      const categorizedGames = JSON.parse(savedCategorizedGames);

      
      const currentCategoryGames = categorizedGames[this.category] || [];
      const gameIndex = currentCategoryGames.findIndex((g: { id: string }) => g.id === game.id);
      if (gameIndex > -1) {
        currentCategoryGames.splice(gameIndex, 1);
      }

      
      categorizedGames[this.selectedCategory] = categorizedGames[this.selectedCategory] || [];
      categorizedGames[this.selectedCategory].push(game);

      
      localStorage.setItem('categorizedGames', JSON.stringify(categorizedGames));
      this.gamesInCategory = currentCategoryGames;
      this.filteredGames = [...this.gamesInCategory];

      this.dropdownVisible[game.id] = false;
      this.selectedCategory = ''; 
    } else {
      console.warn('Categorized games data not found in local storage.');
    }
  }

  updateLocalStorage(): void {
    const savedCategorizedGames = localStorage.getItem('categorizedGames');
    if (savedCategorizedGames) {
      const categorizedGames = JSON.parse(savedCategorizedGames);
      categorizedGames[this.category] = this.gamesInCategory;
      localStorage.setItem('categorizedGames', JSON.stringify(categorizedGames));
    }
  }
}
