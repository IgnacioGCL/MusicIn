import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ChatsPage } from '../chats/chats';
import { FriendsPage } from '../friends/friends';
import { PendingRequestsPage } from '../pending-requests/pending-requests';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {

  }

  goToPage(id: number) {
    this.menu.close();
    switch (id) {
      case 0:
        this.nav.push(ChatsPage);
        break;
      case 1:
        this.nav.push(FriendsPage);
        break;
      case 2:
        this.nav.push(PendingRequestsPage);
        break;
    }
  }
}
