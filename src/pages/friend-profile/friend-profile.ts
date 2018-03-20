import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserInfo } from '../../models/models';
import { FriendsProvider } from '../../providers/friends/friends';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
  selector: 'page-friend-profile',
  templateUrl: 'friend-profile.html',
})
export class FriendProfilePage {

  friendId: string;
  profileInfo: UserInfo;
  isFriend: boolean;
  loader: Loading;
  buttonDisabled: boolean = false;

  constructor(
    private profileProvider: ProfileProvider,
    private navParams: NavParams,
    private db: AngularFireDatabase,
    private loaderCtrl: LoadingController,
    private friendsProvider: FriendsProvider,
    private toast: ToastProvider
  ) {
    this.profileInfo = {
      id: '',
      name: '...',
      email: '...',
      photoUrl: 'assets/imgs/electric-guitar.png',
      role: '...',
      instrument: '...'
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
          this.isFriend = true;
        } else {
          this.isFriend = false;
          this.checkDisableSendRquestButton();
        }
      });
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfileInfo(this.friendId).then(friendProfile => {
      this.profileInfo = friendProfile;
    });
  }

  sendFriendRequest() {
    this.friendsProvider.sendRequest(this.friendId).then(() => {
      this.toast.requestSent();
    });
  }

  checkDisableSendRquestButton() {
    this.db.list(`/users/${this.profileProvider.getProfileInfo().id}/requestsSent`, ref => ref.orderByValue().equalTo(this.friendId))
      .valueChanges()
      .subscribe(users => {
        if(users.length > 0){
          this.buttonDisabled = true;
        }
      })
  }

}
