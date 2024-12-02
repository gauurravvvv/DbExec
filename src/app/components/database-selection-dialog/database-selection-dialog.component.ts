import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Database } from '../../types/database.types';
import { MOCK_DATABASES } from '../../constants/database.constants';

@Component({
  selector: 'app-database-selection-dialog',
  templateUrl: './database-selection-dialog.component.html',
  styleUrls: ['./database-selection-dialog.component.scss']
})
export class DatabaseSelectionDialogComponent {
  selectedDatabase: Database | null = null;
  databases = MOCK_DATABASES;

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