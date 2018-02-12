import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { MomentModule } from 'angular2-moment';
import { locale } from 'moment';

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
import { ToastProvider } from '../providers/toast/toast';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import { EventDetailsComponent } from '../components/event-details/event-details';
import { OfferDetailsComponent } from '../components/offer-details/offer-details';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { ChatsPage } from '../pages/chats/chats';
import { CreateEventComponent } from '../components/create-event/create-event';
import { CreateOfferComponent } from '../components/create-offer/create-offer';
import { EventsProvider } from '../providers/events/events';

locale('es-es');

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
    OfferDetailsComponent,
    CreateEventComponent,
    CreateOfferComponent,
    YoutubePipe,
    ChatsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: 'ios', tabsHideOnSubPages: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MomentModule
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
    OfferDetailsComponent,
    CreateEventComponent,
    CreateOfferComponent,
    ChatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MessagesProvider,
    ProfileProvider,
    AngularFireDatabase,
    ToastProvider,
    Camera,
    DatePicker,
    EventsProvider
  ]
})
export class AppModule { }