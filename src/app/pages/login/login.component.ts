import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

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
  
  features = [
    {
      icon: 'bi-eye',
      title: 'Visual Database Explorer',
      description: 'Navigate through your database structure with an intuitive visual interface'
    },
    {
      icon: 'bi-graph-up',
      title: 'Performance Insights',
      description: 'Get real-time performance metrics and query optimization suggestions'
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure Access',
      description: 'Enterprise-grade security with role-based access control'
    },
    {
      icon: 'bi-code-square',
      title: 'Smart Query Builder',
      description: 'Build complex queries with our intelligent visual query builder'
    }
  ];

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
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Handle login logic
      console.log(this.loginForm.value);
    }
  }
} 
