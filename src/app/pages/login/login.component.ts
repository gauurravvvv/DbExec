import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseSelectionDialogComponent } from '../../components/database-selection-dialog/database-selection-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        query('.login-card', [
          style({ opacity: 0, transform: 'translateX(20px)' }),
          animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        query('.feature-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  features = [
    {
      icon: 'visibility',
      title: 'Visual Database Explorer',
      description: 'Navigate through your database structure with an intuitive visual interface'
    },
    {
      icon: 'speed',
      title: 'Performance Insights',
      description: 'Get real-time performance metrics and query optimization suggestions'
    },
    {
      icon: 'security',
      title: 'Secure Access',
      description: 'Enterprise-grade security with role-based access control'
    },
    {
      icon: 'auto_awesome',
      title: 'Smart Query Builder',
      description: 'Build complex queries with our intelligent visual query builder'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      organization: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const success = await this.authService.login({
          organization: this.loginForm.get('organization')?.value,
          username: this.loginForm.get('username')?.value,
          password: this.loginForm.get('password')?.value
        });

        if (success) {
          if (this.authService.isUser()) {
            this.showDatabaseSelection();
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }

  private showDatabaseSelection(): void {
    const dialogRef = this.dialog.open(DatabaseSelectionDialogComponent, {
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Selected database:', result);
        this.router.navigate(['/dashboard']);
      }
    });
  }
} 