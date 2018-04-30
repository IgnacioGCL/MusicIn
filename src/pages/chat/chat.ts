import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ChatsManagerProvider } from '../../providers/chats-manager/chats-manager';
import { ProfileProvider } from '../../providers/profile/profile';
import { ChatMessage } from '../../models/models';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chatRoomId: string;
  friendName: string;
  messages: ChatMessage[];
  chatMessage: string;

  constructor(navParams: NavParams, private chatsManager: ChatsManagerProvider, private profileProvider: ProfileProvider) {
    this.chatRoomId = navParams.get('chatRoomId');
    this.friendName = navParams.get('friendName');
  }

  ionViewDidLoad(): void {
    this.chatsManager.getMessagesFromChat(this.chatRoomId).subscribe(messages => this.messages = messages);
  }

  writeMessage(): void {
    this.chatsManager.writeMessage(this.chatRoomId, this.chatMessage).then(() => {
      this.chatMessage = '';
    });
  }

}
