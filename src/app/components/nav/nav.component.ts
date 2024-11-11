import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  openNav() {
    const sideNav = document.getElementById('sideNav');
    if (sideNav) {
      sideNav.style.width = '250px';
    }
  }

  closeNav() {
    const sideNav = document.getElementById('sideNav');
    if (sideNav) {
      sideNav.style.width = '0'; 
    }
  }
}
