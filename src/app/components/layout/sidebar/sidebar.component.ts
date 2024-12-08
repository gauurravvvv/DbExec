import { Component, HostListener } from '@angular/core';

interface MenuItem {
  title: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
  badge?: string;
  isVisible?: boolean;
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

  menuItems: MenuItem[] = [
    {
      title: 'COMPONENTS',
      isExpanded: true,
      children: [
        {
          title: 'UI Elements',
          icon: 'fas fa-palette',
          isExpanded: false,
          level: 1,
          children: []
        },
        {
          title: 'Forms',
          icon: 'fas fa-edit',
          level: 1,
          badge: '10'
        },
        {
          title: 'Tables',
          icon: 'fas fa-table',
          isExpanded: false,
          level: 1,
          children: []
        },
        {
          title: 'Charts',
          icon: 'fas fa-chart-bar',
          isExpanded: false,
          level: 1,
          children: []
        },
        {
          title: 'Icons',
          icon: 'fas fa-icons',
          isExpanded: false,
          level: 1,
          children: []
        },
        {
          title: 'Maps',
          icon: 'fas fa-map-marker-alt',
          isExpanded: false,
          level: 1,
          children: []
        },
        {
          title: 'Multi Level',
          icon: 'fas fa-layer-group',
          isExpanded: true,
          level: 1,
          children: [
            { 
              title: 'Level 1.1',
              route: '/level-1-1',
              level: 2
            },
            { 
              title: 'Level 1.2',
              isExpanded: true,
              level: 2,
              children: [
                { title: 'Level 2.1', route: '/level-2-1', level: 3 },
                { title: 'Level 2.2', route: '/level-2-2', level: 3 }
              ]
            }
          ]
        }
      ]
    }
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleSubmenu(item: MenuItem) {
    item.isExpanded = !item.isExpanded;
  }

  getIndentation(level: number = 1): string {
    return `${(level - 1) * 20}px`;
  }
} 