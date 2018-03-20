import { Component } from '@angular/core';
import { MessagesProvider } from '../../providers/messages/messages';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserInfo, MessageInfo } from '../../models/models';
import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  messages: MessageInfo[];
  profileInfo: UserInfo;

  constructor(private messageProvider: MessagesProvider, private profileProvider: ProfileProvider, private actionCtrl: ActionSheetController) {
    this.profileInfo = {
      id: '',
      name: '...',
      email: '...',
      photoUrl: '',
      role: '...',
      instrument: '...'
    }
  }

  ionViewDidLoad() {
    this.profileInfo = this.profileProvider.getProfileInfo();
    this.messageProvider.getMessages().subscribe(messages => this.messages = messages);
  }

  chooseImageOption() {
    this.actionCtrl.create({
      title: 'Elige una opción',
      buttons: [
        {
          text: 'Ver imagen',
          handler: () => true
        },
        {
          text: 'Subir imagen',
          handler: () => {}
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    }).present();
  }

}
