import { Component } from '@angular/core';
import { MessagesProvider } from '../../providers/messages/messages';
import { IonicPage, ModalController } from 'ionic-angular';
import { MessageInfo } from '../../models/models';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: MessageInfo[];

  constructor(private messageProvider: MessagesProvider, private modalCtrl: ModalController) {
    this.messages = [];
  }

  ionViewDidLoad() {
    this.messageProvider.getMessages().subscribe(messages => this.messages = messages);
  }

  goToWritePost() {
    this.modalCtrl.create('write-message').present();
  }

  trackById(index, item) {
    return item.id;
  }

}
