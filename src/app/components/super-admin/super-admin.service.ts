import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { SUPER_ADMIN } from "src/app/constants/api";
import { IParams } from "src/app/core/interfaces/global.interface";

@Injectable({
  providedIn: "root",
})
export class SuperAdminService {
  constructor(
    private http: HttpClient,
  ) {}

  listSuperAdmin(params:IParams){
   return this.http
			.get(SUPER_ADMIN.LIST + `/${params.pageNumber}/${params.limit}`)
			.pipe(
				map((response: any) => {
					const result = JSON.parse(JSON.stringify(response));
					return result;
				})
			);
  }

  

}
