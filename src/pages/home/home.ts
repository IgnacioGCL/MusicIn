import { Component, ChangeDetectorRef } from '@angular/core';
import { MessagesProvider } from '../../providers/messages/messages';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { WriteMessageComponent } from '../../components/write-message/write-message';
import { MessageInfo } from '../../models/models';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { MessageCommentsPage } from '../message-comments/message-comments';
import { AngularFireDatabase } from 'angularfire2/database';
import { LikesProvider } from '../../providers/likes/likes';
import { LikesPage } from '../likes/likes';
import { Subject } from 'rxjs/Subject';
import { FriendProfilePage } from '../friend-profile/friend-profile';
import { StatusBar } from '@ionic-native/status-bar';
import { RichContentComponent } from '../../components/rich-content/rich-content';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: MessageInfo[];
  noMessages: boolean;
  loader: Loading;
  friendName: Subject<string>;
  queryFriend;
  friendInput: string;
  friends: string[];

  constructor(
    private navCtrl: NavController,
    private messageProvider: MessagesProvider,
    private modalCtrl: ModalController,
    private messagesProvider: MessagesProvider,
    private db: AngularFireDatabase,
    private likesProvider: LikesProvider,
    private loading: LoadingController,
    private cdRef: ChangeDetectorRef
  ) {
    let loader = this.loading.create({
      content: 'Espere un momento...'
    });
    loader.present();
    this.friends = [];
    this.messages = [];
    this.messageProvider.getMessages().subscribe(messages => {
      loader.dismiss();
      if (messages.length > 0) {
        this.noMessages = false;
        this.messages = messages;
      } else {
        this.noMessages = true;
      }
    });
  }

  ionViewDidLoad() {
    this.friendName = new Subject();
    this.queryFriend = this.friendName.switchMap(friend => {
      return this.db.list('/usersIds', ref => ref.orderByValue().startAt(friend).endAt(`${friend}\uf8ff`)).snapshotChanges();
    });
    this.queryFriend.subscribe(queriedFriends => {
      this.friends = queriedFriends.map(friend => ({ key: friend.payload.key, name: friend.payload.val() }));
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

  searchFriends() {
    if (this.friendInput.length > 0) {
      this.friendName.next(this.friendInput);
    } else {
      this.friends = [];
    }
  }

  seeFriendProfile(friendId) {
    this.navCtrl.push(FriendProfilePage, {
      id: friendId
    });
  }

  getMessage(message: string): string {
    const regex: RegExp = /( *#[A-Za-z_]* *)/g;
    const expresion = message.match(regex);
    if (expresion) {
      const richContent = expresion[0].trim();
      let newMessage = message.replace(regex, ` <a>${richContent}</a> `);
      return newMessage;
    } else {
      return message;
    }
  }

  showRichContent(artistOrBand: string) {
    this.modalCtrl.create(RichContentComponent, { artistOrBand }).present();
  }

}
