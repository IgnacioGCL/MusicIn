import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { ProfileProvider } from '../../providers/profile/profile';


@Component({
  selector: 'page-message-comments',
  templateUrl: 'message-comments.html',
})
export class MessageCommentsPage {

  userId: string;
  messageId: string;
  comments: any;
  comment: string;
  promises: any[];
  loader: Loading;

  constructor(private navParams: NavParams, private messagesProvider: MessagesProvider, private profileProvider: ProfileProvider, private loaderCtrl: LoadingController) {
    this.userId = this.navParams.get('userId');
    this.messageId = this.navParams.get('messageId');
    this.loader = this.loaderCtrl.create({ content: 'Espere un momento...' });
    this.loader.present();

    this.messagesProvider.getCommentsFromMessage(this.messageId, this.userId).subscribe(comments => {
      this.promises = comments.map(comment => {
        return this.profileProvider.getUserProfileInfo(comment.userId).then(userInfo => {
          return {
            date: comment.date,
            message: comment.message,
            userId: comment.userId,
            name: userInfo.name,
            photoUrl: userInfo.photoUrl
          }
        });
      });

      Promise.all(this.promises).then(res => {
        this.comments = res;
        this.loader.dismiss();
      });
    });

  }

  sendComment() {
    this.loader = this.loaderCtrl.create({ content: 'Espere un momento...' });
    this.messagesProvider.writeComment(this.comment, this.profileProvider.getProfileInfo().id, this.messageId).then(() => {
      this.loader.dismiss();
      this.comment = "";
    });
  }

}
