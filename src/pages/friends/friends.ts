import { Component } from '@angular/core';
import { LoadingController, Loading, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileProvider } from '../../providers/profile/profile';
import { FriendShort } from '../../models/models';
import { FriendsProvider } from '../../providers/friends/friends';
import { MessagesProvider } from '../../providers/messages/messages';
import { FriendProfilePage } from '../friend-profile/friend-profile';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  loader: Loading;
  noFriends: boolean;
  friends: FriendShort[];

  constructor(
    private loaderCtrl: LoadingController,
    private db: AngularFireDatabase,
    private profileProvider: ProfileProvider,
    private friendsProvider: FriendsProvider,
    private navCtrl: NavController 
  ) {
    this.loader = this.loaderCtrl.create({
      content: 'Espere un momento...'
    });
    this.loader.present();
    this.loadFriends();
  }

  loadFriends() {
    let promises = [];
    this.friendsProvider.getFriends().then((friends: FriendShort[]) => {
      this.loader.dismiss();
      if (friends.length > 0) {
        this.noFriends = false;
        promises = friends.map(friend => {
          return this.profileProvider.getUserProfileInfo(friend.id).then(userInfo => {
            return {
              userId: userInfo.id,
              name: userInfo.name,
              photoUrl: userInfo.photoUrl
            }
          });
        });
      } else {
        this.noFriends = true;
      }
      Promise.all(promises).then(friends => this.friends = friends);
    });
  }

  goToProfile(userId: string){
    this.navCtrl.push(FriendProfilePage,{
      id: userId
    });
  }


}
