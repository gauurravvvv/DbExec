import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListSuperAdminComponent } from "./list-super-admin/list-super-admin.component";
import { AddSuperAdminComponent } from "./add-super-admin/add-super-admin.component";

const routes: Routes = [
  {
    path: "",
    component: ListSuperAdminComponent,
  },
  {
    path: "add",
    component: AddSuperAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
