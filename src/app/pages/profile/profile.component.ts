import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileServiceService } from '../../profile-service.service';
import { Profile } from '../../Models/profile';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile: Profile | undefined;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    avatar: new FormControl(''),
  });

  constructor(private profileService: ProfileServiceService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: data => {
        this.profile = data;
        if (data) {
          this.form.controls['name'].setValue(data.name);
          this.form.controls['email'].setValue(data.email);
          this.form.controls['password'].setValue(data.password);
          this.form.controls['avatar'].setValue(data.avatar);
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  updateProfile() {
    if (this.form.valid) {
      const updatedProfile: Profile = {
        ...this.profile,
        ...this.form.getRawValue()
      };
      this.profileService.updateProfile(updatedProfile).subscribe({
        next: data => {
          console.log('Profile updated successfully');
          console.log('Data: ' + data);
          this.notificationService.showSuccess('Profile updated successfully!');
          setTimeout(() => {
            window.location.reload(); 
          }, 2000);  
        },
        error: error => {
          console.error('Error updating profile', error);
          this.notificationService.showError('Failed to update profile. Please try again.');
        }
      });
    }
  }
}
