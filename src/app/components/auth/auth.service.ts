import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { AUTH } from "src/app/constants/api";
import { SessionStorageType, StorageType } from "src/app/constants/storageType";
import { ROLES } from "src/app/constants/user.constant";
import { map } from "rxjs/operators";
import { StorageService } from "src/app/core/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  isForgetPasswordForm = false;
  constructor(
    private http: HttpClient,
  ) {}

  login(loginForm: UntypedFormGroup) {
    const { organisation, username, password } = loginForm.value;
    return this.http
      .post(AUTH.LOGIN, {
        organisation: organisation,
        username: username,
        password: password,
      })
      .pipe(
        map((response) => {
          const result = JSON.parse(JSON.stringify(response));
          if (result.status) {
            // First set the access token
            this.setAccessToken(result.data.token);
            
            // Then store other details
            StorageService.set(
              StorageType.ROLE,
              JSON.stringify(result.data.user.role)
            );

            if (result.data.user.role !== ROLES.SUPER_ADMIN) {
              StorageService.setSessionVal(
                SessionStorageType.ORGANISATION_ID,
                result.data.user.organisationId
              );
            }

            StorageService.setSessionVal(
              SessionStorageType.ORGANISATION,
              result.data.user.organisation
            );
          }
          return result;
        })
      );
  }

  public setAccessToken(accessToken: string) {
    StorageService.set(StorageType.ACCESS_TOKEN, accessToken);
  }

  public isLoggedIn() {
    const accessToken = StorageService.get(StorageType.ACCESS_TOKEN);
    return accessToken;
  }
}
