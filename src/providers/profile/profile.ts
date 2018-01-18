import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo, MessageInfo } from '../../models/models';


@Injectable()
export class ProfileProvider {

  constructor(private db: AngularFireDatabase) {
  }

  getProfileInfo(): Promise<UserInfo> {
    return this.db.object(`/users/4852PhmT4aZ1JilPHVxjEBCUrCW2/profile`)
      .valueChanges()
      .first()
      .toPromise()
      .then((profileInfo: UserInfo) => {
        return {
          name: profileInfo.name,
          role: profileInfo.role,
          email: profileInfo.email,
          photoUrl: profileInfo.photoUrl,
        }
      })
  }

}
