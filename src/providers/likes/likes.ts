import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileProvider } from '../profile/profile';

/*
  Generated class for the LikesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LikesProvider {

  myUserId: string;

  constructor(private db: AngularFireDatabase, private profileProvider: ProfileProvider) {
    this.myUserId = this.profileProvider.getProfileInfo().id;
  }

  public modifyLike(messageId, userId, likes) {
    return this.db.object(`users/${userId}/messages/${messageId}/likes/${this.myUserId}`)
      .snapshotChanges()
      .first()
      .toPromise()
      .then(snapshot => {
        if (snapshot.payload.val() !== null) {
          this.substractLike(messageId, userId, likes);
        } else {
          this.addLike(messageId, userId, likes);
        }
      });
  }

  private addLike(messageId, userId, likes): Promise<boolean> {
    let promises = [];
    return new Promise((resolve, reject) => {
      promises.push(this.db.object(`users/${userId}/messages/${messageId}/likes/${this.myUserId}`).set(this.myUserId));
      promises.push(this.db.object(`users/${userId}/messages/${messageId}/content`).update({likes: likes+1}));
      Promise.all(promises)
      .then(() => resolve(true))
      .catch(err => {
        console.log(err);
        reject(false);
      });
    });
  }

  private substractLike(messageId, userId, likes): Promise<boolean> {
    let promises = [];
    return new Promise((resolve, reject) => {
      promises.push(this.db.list(`users/${userId}/messages/${messageId}/likes/${this.myUserId}`).remove());
      promises.push(this.db.object(`users/${userId}/messages/${messageId}/content`).update({likes: likes-1}));
      Promise.all(promises)
      .then(() => resolve(true))
      .catch(err => {
        console.log(err);
        reject(false);
      });
    });
  }


}
