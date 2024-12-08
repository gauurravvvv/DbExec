import { Component, HostListener } from '@angular/core';
import { StorageType } from 'src/app/constants/storageType';

interface Permission {
  label: string;
  value?: string;
  name?: string;
  status: boolean;
  icon?: string;
  subPermissions?: Permission[];
}

interface MenuItem {
  title: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
  level?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isExpanded = true;
  isMobile = window.innerWidth <= 768;
  menuItems: MenuItem[] = [];

  constructor() {
    this.initializeMenu();
  }

  private initializeMenu() {
    const token = localStorage.getItem(StorageType.ACCESS_TOKEN);
    if (token) {
      try {
        const permissions = this.getPermissionsFromToken(token);
        this.menuItems = this.transformPermissionsToMenu(permissions);
      } catch (error) {
        console.error('Error parsing permissions:', error);
      }
    }
  }

  private getPermissionsFromToken(token: string): Permission[] {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return tokenPayload.permissions || [];
  }

  private transformPermissionsToMenu(permissions: Permission[]): MenuItem[] {
    return [{
      title: 'MENU',
      isExpanded: true,
      children: permissions.map(perm => this.createMenuItem(perm, 1))
    }];
  }

  private createMenuItem(permission: Permission, level: number): MenuItem {
    const menuItem: MenuItem = {
      title: permission.label,
      level: level,
      isExpanded: false,
      icon: permission.icon
    };

    if (permission.subPermissions && permission.subPermissions.length > 0) {
      menuItem.children = permission.subPermissions.map(subPerm => 
        this.createMenuItem(subPerm, level + 1)
      );
    } else {
      menuItem.route = `/${permission.value || permission.name}`;
    }

    return menuItem;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isExpanded = false;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    document.documentElement.style.setProperty('--tooltip-y', `${event.clientY}px`);
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleSubmenu(item: MenuItem) {
    item.isExpanded = !item.isExpanded;
    
    // If we're collapsing this item, collapse all its children recursively
    if (!item.isExpanded) {
      this.collapseChildren(item);
    }
  }

  private collapseChildren(item: MenuItem) {
    if (item.children) {
      item.children.forEach(child => {
        child.isExpanded = false;
        this.collapseChildren(child);
      });
    }
  }

  getIndentation(level: number = 1): string {
    return `${(level - 1) * 20}px`;
  }
} 