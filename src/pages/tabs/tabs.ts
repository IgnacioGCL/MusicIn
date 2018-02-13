import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage({
  name: 'tabs'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'home';
  tab2Root = 'events';
  tab3Root = 'offers';
  tab4Root = 'profile';
  tab5Root = 'chats';

  constructor() {
    
  }
}
