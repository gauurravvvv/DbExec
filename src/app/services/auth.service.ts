import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/auth.types';
import { UserRole } from '../constants/auth.constants';
import { LoginCredentials } from '../types/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginCredentials): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          username: credentials.username,
          role: this.getMockRole(credentials.username),
          token: 'mock-jwt-token',
          organization: credentials.organization
        };

        this.setUserInStorage(mockUser);
        this.currentUserSubject.next(mockUser);
        resolve(true);
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isUser(): boolean {
    return this.currentUserValue?.role === UserRole.USER;
  }

  isSuperAdmin(): boolean {
    return this.currentUserValue?.role === UserRole.SUPER_ADMIN;
  }

  isOrganisationAdmin(): boolean {
    return this.currentUserValue?.role === UserRole.ORGANISATION_ADMIN;
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  private setUserInStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private getMockRole(username: string): UserRole {
    if (username.toLowerCase().includes('super')) {
      return UserRole.SUPER_ADMIN;
    } else if (username.toLowerCase().includes('admin')) {
      return UserRole.ORGANISATION_ADMIN;
    }
    return UserRole.USER;
  }
} 