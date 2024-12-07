import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  settings = {
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: 'en'
  };

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }
  ];

  saveSettings() {
    // Implement settings save logic
    console.log('Settings saved:', this.settings);
  }
} 