import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Chat, ChatMessage } from '../../models/models';
import { ProfileProvider } from '../profile/profile';

@Injectable()
export class ChatsManagerProvider {

  myUserInfo: any;

  constructor(private db: AngularFireDatabase, private profileProvider: ProfileProvider) {
    this.myUserInfo = this.profileProvider.getProfileInfo();
  }

  public getChats(): Observable<Chat[]> {
    return this.db.list(`/users/${this.myUserInfo.id}/chats`).valueChanges() as Observable<Chat[]>;
  }

  public createChat(friendInfo: { id: string, name: string }): Promise<any> {
    let promises = [];
    let now = new Date().getTime();
    return this.getFriendPhotoUrl(friendInfo.id).then(friendPhotoUrl => {
      this.db.list(`/chats`).push({})
        .then(success => {
          let chatRoomId: string = success.key;
          let myNewChat: Chat = { friendName: friendInfo.name, friendPhotoUrl, startDate: now, chatRoomId };
          let friendNewChat: Chat = { friendName: this.myUserInfo.name, friendPhotoUrl: this.myUserInfo.photoUrl, startDate: now, chatRoomId };
          promises.push(this.db.object(`/users/${this.myUserInfo.id}/chats/${chatRoomId}`).set(myNewChat));
          promises.push(this.db.object(`/users/${friendInfo.id}/chats/${chatRoomId}`).set(friendNewChat));
          return Promise.all(promises);
        });
    });
  }

  public getMessagesFromChat(chatRoomId: string): Observable<ChatMessage[]> {
    return this.db.list(`/chats/${chatRoomId}`).valueChanges().map(messages => messages.map((message: ChatMessage) => {
      let newMessage: ChatMessage = {
        content: message.content,
        who: message.who,
        cssClass: ''
      };
      newMessage.cssClass = message.who === this.profileProvider.getProfileInfo().id ? 'sent' : 'received';
      return newMessage;
    })) as Observable<ChatMessage[]>;
  }

  public writeMessage(chatRoomId: string, content: string): Promise<any> {
    let myUserId = this.myUserInfo.id;
    return new Promise((resolve, reject) => {
      this.db.list(`/chats/${chatRoomId}`).push({ content, who: myUserId }).then(() => resolve(), err => reject());
    });
  }


  private getFriendPhotoUrl(friendId: string): Promise<string> {
    return this.db.object(`/users/${friendId}/profile/photoUrl`).valueChanges().first().toPromise() as Promise<string>;
  }

}
