import { Component } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileProvider } from '../../providers/profile/profile';
import { FriendShort } from '../../models/models';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  loader: Loading;
  noFriends: boolean;
  friends: FriendShort[];

  constructor(private loaderCtrl: LoadingController, private db: AngularFireDatabase, private profileProvider: ProfileProvider) {
    this.loader = this.loaderCtrl.create({
      content: 'Espere un momento...'
    });
    this.loader.present();
    this.loadFriends();
  }

  loadFriends() {
    this.db.list(`/users/${this.profileProvider.getProfileInfo().id}/friends`)
      .valueChanges()
      .first()
      .toPromise()
      .then((friends: FriendShort[]) => {
        this.loader.dismiss();
        if (friends.length > 0) {
          this.friends = friends;
          this.noFriends = false;
        } else {
          this.noFriends = true;
        }
      });
  }


}
