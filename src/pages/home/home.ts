import { Component } from '@angular/core';
import { MessagesProvider } from '../../providers/messages/messages';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { WriteMessageComponent } from '../../components/write-message/write-message';
import { MessageInfo } from '../../models/models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: MessageInfo[];
  constructor(private messageProvider: MessagesProvider, private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.messageProvider.getMessages().subscribe(messages => this.messages = messages);
  }

  goToWritePost() {
    this.modalCtrl.create(WriteMessageComponent).present();
  }

}
