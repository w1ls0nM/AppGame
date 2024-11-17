import { Component } from '@angular/core';
import { Profile } from '../../Models/profile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileServiceService } from '../../profile-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile: Profile|undefined;

  form: FormGroup = new FormGroup(
    {
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required)
    }
  );
  
  constructor(private profileService: ProfileServiceService){}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: data => {
        console.log(data);
        this.profile = data;
        this.form.controls['id'].setValue(data.id);
        this.form.controls['name'].setValue(data.name);
        this.form.controls['email'].setValue(data.email);
        this.form.controls['password'].setValue(data.password);
        this.form.controls['avatar'].setValue(data.avatar);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  updateProfile(){
    this.profileService.updateProfile(this.profile?.id, this.form.getRawValue()).subscribe(
      {
        next: data => {
          console.log(data);
        },
        error: error =>{
          console.error(error);
        }
      }
    )
  }

}
