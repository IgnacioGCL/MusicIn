import { Component } from '@angular/core';
import { MessagesProvider } from '../../providers/messages/messages';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { WriteMessageComponent } from '../../components/write-message/write-message';
import { MessageInfo } from '../../models/models';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { MessageCommentsPage } from '../message-comments/message-comments';
import { AngularFireDatabase } from 'angularfire2/database';
import { LikesProvider } from '../../providers/likes/likes';
import { LikesPage } from '../likes/likes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: MessageInfo[];
  noMessages: boolean;
  loader: Loading;

  constructor(
    private navCtrl: NavController,
    private messageProvider: MessagesProvider,
    private modalCtrl: ModalController,
    private messagesProvider: MessagesProvider,
    private db: AngularFireDatabase,
    private likesProvider: LikesProvider,
    private loading: LoadingController
  ) {
    let loader = this.loading.create({
      content: 'Espere un momento'
    });
    loader.present();
    this.messages = [];
    this.messageProvider.getMessages().subscribe(messages => {
      loader.dismiss();
      if (messages) {
        this.noMessages = false;
        this.messages = messages;
      } else {
        this.noMessages = true;
      }
    });
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

  seeLikes(messageId, userId) {
    this.navCtrl.push(LikesPage, {
      userId: userId,
      messageId: messageId
    });
  }

}
