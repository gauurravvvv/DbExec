import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageType } from '../../constants/storageType';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';



interface IAPIResponse {
  message: string;
  data?: any;
  status: boolean
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  accessToken!: string | null;
  decodeToken!: any;
  userRole!: string;
  reportUrl!: string;
  public isSidenavOpened: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  visualizationUrl!: SafeResourceUrl;
  search!: string;

  constructor(private router: Router) {}


  chipNameProvider(fullName: string | undefined | null) {
    const splitNameArray: string[] | undefined = fullName?.trim()?.split(' ');
    let chipName = '';
    if (splitNameArray) {
      if (splitNameArray.length > 1 && splitNameArray[1] !== 'null') {
        chipName =
          splitNameArray[0].charAt(0) +
          splitNameArray[splitNameArray.length - 1].charAt(0);
      } else {
        chipName =
          splitNameArray[0].charAt(0) +
          splitNameArray[0].charAt(splitNameArray[0].length - 1);
      }
    }
    return chipName.toUpperCase();
  }

  toControl(absCtrl: AbstractControl): UntypedFormControl {
    const ctrl = absCtrl as UntypedFormControl;
    return ctrl;
  }

  checkMobileField(mobileNumber: string, countryCode: string) {
    if (
      mobileNumber !== null &&
      mobileNumber !== '' &&
      mobileNumber !== undefined
    ) {
      return countryCode + mobileNumber.toString();
    } else {
      return null;
    }
  }

  getDecodeToken() {
    const accessToken = StorageService.get(StorageType.ACCESS_TOKEN);
    if (accessToken) return JSON.parse(atob(accessToken.split('.')[1]));
    else this.router.navigateByUrl('');
  }

  getTokenDetails(value: string) {
    const accessToken = StorageService.get(StorageType.ACCESS_TOKEN);
    let decodeToken;
    if (accessToken) {
      decodeToken = JSON.parse(atob(accessToken.split('.')[1]));
    } else {
      this.router.navigateByUrl('');
    }
    let userRole = decodeToken.role;
    let userName = decodeToken.username;
    let organisationName = decodeToken.organsation;
    let organisationId = decodeToken.organsationId;

    switch (value) {
      case 'decodeToken':
        return decodeToken;
      case 'role':
        return userRole;
      case 'username':
        return userName;
      case 'organisationName':
        return organisationName;
      case 'organisationId':
        return organisationId;
    }
  }

  camelCase(input: string): string {
    const noSplChar = input.replace(/[^A-Za-z0-9 ]/g, ' ').toLowerCase();
    const words = noSplChar.split(' ');
    if (words.length === 1) {
      return words[0].toLowerCase();
    }

    const capitalizedWords = words.map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    });

    return capitalizedWords.join('');
  }

  handleServiceResponse(
    result: IAPIResponse,
    showToast = true,
    showErrorToast = true
  ): boolean {
    const shouldShowToast = result.status ? showToast : showErrorToast;
    
    if (shouldShowToast) {
      Swal.fire({
        icon: result.status ? 'success' : 'error',
        title: result.status ? 'Success' : 'Error',
        text: result.message || 'Something went wrong',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        background: result.status ? '#e8f5e9' : '#ffebee',
        color: result.status ? '#2e7d32' : '#c62828',
        iconColor: result.status ? '#43a047' : '#d32f2f'
      });
    }
    
    return result.status;
  }

}
