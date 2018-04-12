import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ProfileProvider } from '../providers/profile/profile';
import { MenuPage } from '../pages/menu/menu';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { environment } from '../environments/environment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private profileProvider: ProfileProvider,
    private auth: AngularFireAuth
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkIfLogged();
    });
  }

  checkIfLogged(): void {
    this.rootPage = localStorage.getItem('music_in_user') ? MenuPage : LoginPage;
  }
}
