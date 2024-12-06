import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { LOGIN_PAGE_OPTIONS } from 'src/app/constants/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerList', [
      transition(':enter', [
        query('.feature-item', [
          style({ transform: 'translateX(-50px)', opacity: 0 }),
          stagger(100, [
            animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ])
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.8s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  
  features = LOGIN_PAGE_OPTIONS;
  private readonly encryptionKey = 'your-secret-key-2024'; // You should store this securely

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      organization: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Load saved credentials if they exist
    const savedCredentials = localStorage.getItem('savedCredentials');
    if (savedCredentials) {
      try {
        const credentials = JSON.parse(savedCredentials);
        this.loginForm.patchValue({
          organization: credentials.organization,
          username: credentials.username,
          password: this.decrypt(credentials.password),
          rememberMe: true
        });
      } catch (error) {
        console.error('Error loading saved credentials:', error);
        localStorage.removeItem('savedCredentials');
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      
      if (formValue.rememberMe) {
        // Save credentials with encrypted password
        const credentialsToSave = {
          organization: formValue.organization,
          username: formValue.username,
          password: this.encrypt(formValue.password)
        };
        localStorage.setItem('savedCredentials', JSON.stringify(credentialsToSave));
      } else {
        // Clear saved credentials if remember me is unchecked
        localStorage.removeItem('savedCredentials');
      }

      // Handle login logic
      console.log('Logging in with:', {
        ...formValue,
        password: '********' // Don't log the actual password
      });
    }
  }

  private encrypt(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result); // Convert to base64
  }

  private decrypt(encryptedText: string): string {
    try {
      const text = atob(encryptedText); // Convert from base64
      let result = '';
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
        result += String.fromCharCode(charCode);
      }
      return result;
    } catch (error) {
      console.error('Decryption failed:', error);
      return '';
    }
  }
} 
