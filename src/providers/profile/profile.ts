import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo, NewUser } from '../../models/models';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ProfileProvider {

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
  }

  public userLogin(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(email, password)
        .then(success => {
          this.getUserProfileInfo(success.uid).then(userProfile => {
            this.setUserInfoInLocalStorage(userProfile);
            resolve();
          })
          .catch(err => reject(err.code));
        })
        .catch(err => reject(err.code));
    });
  }

  public setUserInfoInLocalStorage(user: UserInfo): void {
    localStorage.setItem('music_in_user', JSON.stringify(user));
  }

  public getProfileInfo(): UserInfo {
    return JSON.parse(localStorage.getItem('music_in_user'));
  }

  public getUserProfileInfo(userId: string): Promise<UserInfo> {
    return this.db.object(`/users/${userId}/profile`)
      .valueChanges()
      .first()
      .toPromise() as Promise<UserInfo>;
  }

  public createAccount(user: NewUser): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password).then(success => {
        delete user.password;
        user.photoUrl = "assets/imgs/electric-guitar.png";
        let userCopy = Object.assign(user);
        userCopy.id = success.user.uid;
        this.addUserToDatabase(success.user.uid, userCopy)
          .then(() => {
            this.setUserInfoInLocalStorage(userCopy);
            resolve();
          })
          .catch(err => reject(err.code));
      })
        .catch(err => reject(err.code));
    });
  }

  private addUserToDatabase(userId: string, user: NewUser) {
    return this.db.object(`/users/${userId}/profile`)
      .set(user);
  }

}
