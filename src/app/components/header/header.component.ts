import { Component, Input } from '@angular/core';
import { Profile } from '../../Models/profile';
import { NavComponent } from "../nav/nav.component";
import { ProfileServiceService } from '../../profile-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  profile: Profile | undefined;

  defaultAvatar: string = 'https://icon-library.com/images/guest-icon/guest-icon-5.jpg';

  getInitials(name: string | undefined): string {
    if (!name) {
      return 'G'; 
    }
    const nameParts = name.split(' ');
    const initials = nameParts.length > 1
      ? nameParts[0][0] + nameParts[nameParts.length - 1][0] 
      : nameParts[0][0]; 
    return initials.toUpperCase();
  }

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