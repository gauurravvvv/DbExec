import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AUTH } from 'src/app/constants/api';
import { GlobalService } from 'src/app/core/services/global.service';
import { SessionStorageType } from 'src/app/constants/storageType';
import { StorageType } from 'src/app/constants/storageType';
import { ROLES } from 'src/app/constants/user.constant';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isForgetPasswordForm = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private globalService: GlobalService
  ) {}
  /**
   * @param loginForm login form values
   * @returns the response
   */
  login(loginForm: UntypedFormGroup) {
    const { organisation, username, password } = loginForm.value;
    return this.http
      .post(AUTH.LOGIN, {
        organisation: organisation,
        username: username,
        password: password,
      })
      .pipe(map(response => {
        const result = JSON.parse(JSON.stringify(response));
        if (result.status) {
          const accessToken: string = result.data.token;
          this.globalService.decodeToken = JSON.parse(
            atob(accessToken.split('.')[1])
          );

          // Storing roles
          StorageService.set(
            StorageType.ROLE,
            JSON.stringify(result.data.user.role)
          );

            if (
              this.globalService.decodeToken.role != ROLES.SUPER_ADMIN
            ) {
              StorageService.setSessionVal(
                SessionStorageType.ORGANISATION_ID,
                this.globalService.decodeToken.organisationId
              );
            }
          StorageService.setSessionVal(
              SessionStorageType.ORGANISATION,
              this.globalService.getTokenDetails('organisationName')
            );

          this.setAccessToken(result.data.token);
        }
        console.log(result)
        return result;
      }));
  }

  public setAccessToken(accessToken: string) {
    StorageService.set(StorageType.ACCESS_TOKEN, accessToken);
  }
  
}
