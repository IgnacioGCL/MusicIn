import { Component } from '@angular/core';
import { MessagesProvider, MessageInfo } from '../../providers/messages/messages';

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

  constructor(private messageProvider: MessagesProvider) {
  }

  ionViewDidLoad() {
    this.messageProvider.getMessages().subscribe(messages => this.messages = messages);
  }

}
