import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
import { OffersPage } from '../offers/offers';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EventsPage;
  tab3Root = OffersPage;
  tab4Root = ProfilePage;

  constructor() {
    
  }
}
