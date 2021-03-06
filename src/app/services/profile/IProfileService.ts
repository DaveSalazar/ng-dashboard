import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/Profile';

export interface IProfileService {
  
  saveProfile(profile: Profile): Observable<void>;

  getProfile(): Profile;
}
