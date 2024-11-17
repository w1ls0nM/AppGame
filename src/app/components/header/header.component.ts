import { Component, Input } from '@angular/core';
import { Profile } from '../../Models/profile';
import { NavComponent } from "../nav/nav.component";
import { ProfileServiceService } from '../../profile-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  profile: Profile | undefined;

  constructor(private profileService: ProfileServiceService, private router: Router) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: data => {
        console.log(data)
        this.profile = data;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  navigateToUpdateProfile() {
    this.router.navigate(['profile']);
  }

}