import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { LOGIN_PAGE_OPTIONS } from 'src/app/constants/global';
import { LoginService } from '../auth.service';
import { StorageType } from 'src/app/constants/storageType';
import { GlobalService } from 'src/app/core/services/global.service';

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
  loginForm: UntypedFormGroup;
  hidePassword = true;
  
  features = LOGIN_PAGE_OPTIONS;
  private readonly encryptionKey = 'your-secret-key-2024'; // You should store this securely

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private loginService: LoginService,
    private globalService: GlobalService
  ) {
    this.loginForm = this.fb.group({
      organisation: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Load saved credentials if they exist
    const savedCredentials = localStorage.getItem(StorageType.SAVED_CREDS);
    if (savedCredentials) {
      try {
        const credentials = JSON.parse(savedCredentials);
        this.loginForm.patchValue({
          organisation: credentials.organisation,
          username: credentials.username,
          password: this.decrypt(credentials.password),
          rememberMe: true
        });
      } catch (error) {
        localStorage.removeItem(StorageType.SAVED_CREDS);
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {organisation, username, password, rememberMe } = this.loginForm.value;
      if (rememberMe) {
        const credentialsToSave = {
          organisation: organisation,
          username: username,
          password: this.encrypt(password)
        };
        localStorage.setItem(StorageType.SAVED_CREDS, JSON.stringify(credentialsToSave));
      } else {
        localStorage.removeItem(StorageType.SAVED_CREDS);
      }

      this.loginService.login(this.loginForm).subscribe({
        next: (res) => {
          if (this.globalService.handleServiceResponse(res)) {
            this.router.navigate(['/home'], { replaceUrl: true });
          }
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Login failed';
          this.globalService.handleServiceResponse({
            status: false,
            message: errorMessage,
            data: null
          }, true, true);
        }
      });
    }
  }

  private encrypt(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result);
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
