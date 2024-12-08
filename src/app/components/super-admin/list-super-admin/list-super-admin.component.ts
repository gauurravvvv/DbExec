import { Component, OnInit } from '@angular/core';
import { IParams } from 'src/app/core/interfaces/global.interface';
import { SuperAdminService } from '../super-admin.service';

interface SuperAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: Date;
  createdAt: Date;
}

@Component({
  selector: 'app-list-super-admin',
  templateUrl: './list-super-admin.component.html',
  styleUrls: ['./list-super-admin.component.scss']
})
export class ListSuperAdminComponent implements OnInit {
  Math = Math;

  listParams:IParams = {
    limit: 100,
    pageNumber: 1
  }
  
  superAdmins: any[] = []

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  // Search
  searchTerm = '';
  filteredAdmins: any[] = [];

  constructor(private superAdminService:SuperAdminService) {
   
  }

  ngOnInit(): void {
    this.listSuperAdminAPI();
    this.applyFilters();
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1; // Reset to first page when searching
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  onPageSizeChange(event: Event): void {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.currentPage = 1; // Reset to first page when changing page size
    this.applyFilters();
  }

  private applyFilters(): void {
    // First apply search filter
    let filtered = this.superAdmins;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = this.superAdmins.filter(admin => 
        (admin.firstName + ' ' + admin.lastName).toLowerCase().includes(term) ||
        admin.email.toLowerCase().includes(term)
      );
    }

    // Update total count
    this.totalItems = filtered.length;

    // Then apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredAdmins = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onEdit(admin: SuperAdmin): void {
    console.log('Edit admin:', admin);
  }

  onDelete(admin: SuperAdmin): void {
    console.log('Delete admin:', admin);
  }

  onAddNewAdmin(): void {
    console.log('Add new admin');
  }

  listSuperAdminAPI(){
    this.superAdminService.listSuperAdmin(this.listParams).subscribe((res:any)=>{
      this.superAdmins = [...res.data.superAdmins];
      this.filteredAdmins = [...this.superAdmins];
      this.totalItems = this.superAdmins.length;
    })
  }
} 