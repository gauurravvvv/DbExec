import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { ListSuperAdminComponent } from './list-super-admin/list-super-admin.component';
import { AddSuperAdminComponent } from './add-super-admin/add-super-admin.component';

@NgModule({
  declarations: [
    ListSuperAdminComponent,
    AddSuperAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { } 