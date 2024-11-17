import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileServiceService } from '../../profile-service.service';
import { Profile } from '../../Models/profile';

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
    avatar: new FormControl('', Validators.required),
  });

  constructor(private profileService: ProfileServiceService) {}

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
      const updatedProfile: Profile = this.form.getRawValue();
      this.profileService.updateProfile(updatedProfile).subscribe({
        next: data => {
          console.log('Profile updated successfully');
          window.location.reload();
        },
        error: error => {
          console.error('Error updating profile', error);
        }
      });
    }
  }
}
