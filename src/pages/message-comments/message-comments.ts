import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';


@Component({
  selector: 'page-message-comments',
  templateUrl: 'message-comments.html',
})
export class MessageCommentsPage {

  userId: string;
  messageId: string;
  comments: any;

  constructor(private navParams: NavParams, private messagesProvider: MessagesProvider) {
    this.userId = this.navParams.get('userId');
    this.messageId = this.navParams.get('messageId');

    this.messagesProvider.getCommentsFromMessage(this.messageId, this.userId).subscribe(comments => this.comments = comments);
  }


}
