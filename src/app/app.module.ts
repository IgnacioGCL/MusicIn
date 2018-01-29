import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { OffersPage } from '../pages/offers/offers';
import { EventsPage } from '../pages/events/events';
import { MessagesProvider } from '../providers/messages/messages';
import { WriteMessageComponent } from '../components/write-message/write-message';
import { environment } from '../environments/environment';
import { ProfileProvider } from '../providers/profile/profile';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import { EventDetailsComponent } from '../components/event-details/event-details';
import { OfferDetailsComponent } from '../components/offer-details/offer-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ProfilePage,
    OffersPage,
    EventsPage,
    WriteMessageComponent,
    EventDetailsComponent,
    OfferDetailsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ProfilePage,
    OffersPage,
    EventsPage,
    WriteMessageComponent,
    EventDetailsComponent,
    OfferDetailsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MessagesProvider,
    ProfileProvider,
    AngularFireDatabase
  ]
})
export class AppModule { }