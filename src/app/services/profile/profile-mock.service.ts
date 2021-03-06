import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { IProfileService } from './IProfileService';

@Injectable({
  providedIn: 'root'
})
export class ProfileMockService implements IProfileService {

  constructor() { }

  saveProfile(profile: Profile): Observable<void> {
    throw new Error('Method not implemented.');
  }
  
  getProfile(): Profile {
    throw new Error('Method not implemented.');
  }
}
