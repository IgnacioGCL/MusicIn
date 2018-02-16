import { Component } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
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
  noUsers: boolean;

  constructor(private navParams: NavParams, private likesProvider: LikesProvider, private loading: LoadingController) {
    this.userId = this.navParams.get('userId');
    this.messageId = this.navParams.get('messageId');
    let loader = this.loading.create({
      content: 'Espere...'
    });
    loader.present();
    this.likesProvider.getUsersWhoGaveLikes(this.messageId, this.userId).subscribe(users => {
      if (users) {
        this.users = users;
        this.noUsers = false;
      }else{
        this.noUsers = true;
      }
      loader.dismiss();
    });
  }


}
