import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Database {
  name: string;
  value: string;
}

@Component({
  selector: 'app-database-selection-dialog',
  templateUrl: './database-selection-dialog.component.html',
  styleUrls: ['./database-selection-dialog.component.scss']
})
export class DatabaseSelectionDialogComponent {
  selectedDatabase: Database | null = null;
  
  // Dummy database options
  databases: Database[] = [
    { name: 'Customer Database', value: 'customer_db' },
    { name: 'Product Database', value: 'product_db' },
    { name: 'Sales Database', value: 'sales_db' },
    { name: 'Inventory Database', value: 'inventory_db' },
    { name: 'Employee Database', value: 'employee_db' }
  ];

  constructor(
    private dialogRef: MatDialogRef<DatabaseSelectionDialogComponent>
  ) {}

  onDatabaseSelect(): void {
    if (this.selectedDatabase) {
      console.log('Selected Database Object:', this.selectedDatabase);
      this.dialogRef.close(this.selectedDatabase);
    }
  }
} 