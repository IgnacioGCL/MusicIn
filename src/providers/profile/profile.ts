import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo } from '../../models/models';


@Injectable()
export class ProfileProvider {

  constructor(private db: AngularFireDatabase) {
  }

  setUserInfoInLocalStorage(user) {
    localStorage.setItem('music_in_user', JSON.stringify(user));
  }

  getProfileInfo(): UserInfo {
    return JSON.parse(localStorage.getItem('music_in_user'));
  }

  getProfileInfoFromFirebase(): Promise<UserInfo> {
    return this.db.object(`/users/4852PhmT4aZ1JilPHVxjEBCUrCW2/profile`)
      .valueChanges()
      .first()
      .toPromise()
      .then((profileInfo: UserInfo) => {
        return {
          id: profileInfo.id,
          name: profileInfo.name,
          role: profileInfo.role,
          email: profileInfo.email,
          photoUrl: profileInfo.photoUrl
        }
      })
  }

}
