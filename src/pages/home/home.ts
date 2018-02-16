import { Component } from '@angular/core';
import { MessagesProvider } from '../../providers/messages/messages';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { WriteMessageComponent } from '../../components/write-message/write-message';
import { MessageInfo } from '../../models/models';
import { NavController } from 'ionic-angular';
import { MessageCommentsPage } from '../message-comments/message-comments';
import { AngularFireDatabase } from 'angularfire2/database';
import { LikesProvider } from '../../providers/likes/likes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: MessageInfo[];

  constructor(
    private navCtrl: NavController,
    private messageProvider: MessagesProvider,
    private modalCtrl: ModalController,
    private messagesProvider: MessagesProvider,
    private db: AngularFireDatabase,
    private likesProvider: LikesProvider
  ) {
    this.messages = [];
  }

  ionViewDidLoad() {
    this.messageProvider.getMessages().subscribe(messages => this.messages = messages);
  }


  goToWritePost() {
    this.modalCtrl.create(WriteMessageComponent).present();
  }

  trackById(index, item) {
    return item.id;
  }

  modifyLike(messageId, userId, likes) {
    this.likesProvider.modifyLike(messageId, userId, likes);
  }

  goToComments(messageId, userId) {
    this.navCtrl.push(MessageCommentsPage, {
      userId: userId,
      messageId: messageId
    });
  }

}
