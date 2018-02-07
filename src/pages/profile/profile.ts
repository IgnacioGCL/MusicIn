import { Component } from '@angular/core';
import { MessagesProvider } from '../../providers/messages/messages';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserInfo, MessageInfo } from '../../models/models';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  messages: MessageInfo[];
  profileInfo: UserInfo;

  constructor(private messageProvider: MessagesProvider, private profileProvider: ProfileProvider) {
    this.profileInfo = {
      id: '',
      name: '...',
      email: '...',
      photoUrl: 'assets/imgs/electric-guitar.png',
      role: '...'
    }
  }

  ionViewDidLoad() {
    this.profileInfo = this.profileProvider.getProfileInfo();
    this.messageProvider.getMessages().subscribe(messages => this.messages = messages);
  }

}
