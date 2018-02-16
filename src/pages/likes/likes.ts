import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LikesProvider } from '../../providers/likes/likes';

/**
 * Generated class for the LikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
})
export class LikesPage {

  userId: string;
  messageId: string;
  users: any;

  constructor(private navParams: NavParams, private likesProvider: LikesProvider) {
    this.userId = this.navParams.get('userId');
    this.messageId = this.navParams.get('messageId');
    this.likesProvider.getUsersWhoGaveLikes(this.messageId, this.userId).subscribe(users => this.users = users);
  }


}
