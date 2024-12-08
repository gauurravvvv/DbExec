import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from 'src/app/constants/routes.config';

interface MenuItem {
  label: string;
  route?: string;
  icon: string;
  children?: MenuItem[];
  isExpanded?: boolean;
  level?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: { children: MenuItem[] }[] = [];
  isExpanded = true;
  isMobile = false;

  constructor() {
    // Initialize menu items with the configuration
    this.menuItems = [{ children: this.processMenuItems(MENU_ITEMS) }];
  }

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private processMenuItems(items: MenuItem[], level: number = 0): MenuItem[] {
    return items.map(item => ({
      ...item,
      level,
      isExpanded: false,
      children: item.children ? this.processMenuItems(item.children, level + 1) : undefined
    }));
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleSubmenu(item: MenuItem) {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  getIndentation(level: number = 0): string {
    return `${1.5 + level * 1}rem`;
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isExpanded = false;
    }
  }
} 