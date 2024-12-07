import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    joinDate: new Date('2024-01-01'),
    avatar: 'assets/images/avatar.png'
  };
} 