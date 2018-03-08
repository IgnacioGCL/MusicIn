import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileProvider } from '../profile/profile';
import { Request, FriendShort } from '../../models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendsProvider {

  constructor(private db: AngularFireDatabase, private profile: ProfileProvider) {

  }

  public pendingRequests(): Observable<Request[]> {
    return this.db.list(`/users/${this.profile.getProfileInfo().id}/requests`)
      .valueChanges() as Observable<Request[]>;
  }

  public getFriends(): Promise<FriendShort[]> {
    return this.db.list(`/users/${this.profile.getProfileInfo().id}/friends`)
      .snapshotChanges()
      .map(friends => friends.map(friend => ({ id: friend.payload.key, name: friend.payload.val() })))
      .first()
      .toPromise();
  }

  public acceptRequest(requestId: string, userId: string, userName: string): Promise<any> {
    let promises = [];
    promises.push(this.db.object(`/users/${this.profile.getProfileInfo().id}/friends/${userId}`)
      .set(userName));
    promises.push(this.db.object(`/users/${this.profile.getProfileInfo().id}/requests/${requestId}`)
      .set({}));
    return Promise.all(promises);
  }

  public declineRequest(requestId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.object(`/users/${this.profile.getProfileInfo().id}/requests/${requestId}`)
        .set({})
        .then(() => resolve)
        .catch(err => {
          console.log(err);
          reject(err);
        })
    });
  }

  public sendRequest(userId): Promise<any> {
    let promises = [];
    promises.push(this.db.list(`/users/${userId}/requests`)
      .push({})
      .then(success => {
        this.db.object(`/users/${userId}/requests/${success.key}`).set({
          id: success.key,
          name: this.profile.getProfileInfo().name,
          userId: this.profile.getProfileInfo().id,
          photoUrl: this.profile.getProfileInfo().photoUrl
        });
      }));
    promises.push(this.db.list(`/users/${this.profile.getProfileInfo().id}/requestsSent`).push(userId));
    return Promise.all(promises);
  }

}
