import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserInfo } from '../../models/models';

@Component({
  selector: 'page-friend-profile',
  templateUrl: 'friend-profile.html',
})
export class FriendProfilePage {

  friendId: string;
  profileInfo: UserInfo;
  isFriend: boolean;
  loader: Loading;

  constructor(
    private profileProvider: ProfileProvider,
    private navParams: NavParams,
    private db: AngularFireDatabase,
    private loaderCtrl: LoadingController
  ) {
    this.profileInfo = {
      id: '',
      name: '...',
      email: '...',
      photoUrl: 'assets/imgs/electric-guitar.png',
      role: '...'
    }
    this.loader = this.loaderCtrl.create({
      content: 'Espere un momento...'
    });
    this.loader.present();
    this.friendId = this.navParams.get('id');
    this.db.object(`/users/${this.profileProvider.getProfileInfo().id}/friends/${this.friendId}`)
      .valueChanges()
      .subscribe(friend => {
        this.loader.dismiss();
        if (friend) {
          console.log(friend);
        } else {
          this.isFriend = false;
        }
      });
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfileInfo(this.friendId).then(friendProfile => {
      this.profileInfo = friendProfile;
    });
  }

  sendFriendRequest(){
    
  }

}
