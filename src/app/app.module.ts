import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

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
import 'rxjs/add/observable/combineLatest';


import { EventDetailsComponent } from '../components/event-details/event-details';
import { OfferDetailsComponent } from '../components/offer-details/offer-details';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { ChatsPage } from '../pages/chats/chats';
import { CreateEventComponent } from '../components/create-event/create-event';
import { CreateOfferComponent } from '../components/create-offer/create-offer';
import { EventsManagerProvider } from '../providers/events-manager/events-manager';
import { MessageCommentsPage } from '../pages/message-comments/message-comments';
import { LikesProvider } from '../providers/likes/likes';
import { LikesPage } from '../pages/likes/likes';
import { MenuPage } from '../pages/menu/menu';
import { FriendProfilePage } from '../pages/friend-profile/friend-profile';
import { FriendsPage } from '../pages/friends/friends';
import { PendingRequestsPage } from '../pages/pending-requests/pending-requests';
import { FriendsProvider } from '../providers/friends/friends';
import { LoginPage } from '../pages/login/login';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { NativeProvider } from '../providers/native/native';
import { OffersManagerProvider } from '../providers/offers-manager/offers-manager';
import { EventsMapPage } from '../pages/events-map/events-map';

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
    ChatsPage,
    MessageCommentsPage,
    LikesPage,
    MenuPage,
    FriendProfilePage,
    FriendsPage,
    PendingRequestsPage,
    LoginPage,
    CreateAccountPage,
    EventsMapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: 'ios', tabsHideOnSubPages: true, backButtonText: 'Atrás' }),
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
    ChatsPage,
    MessageCommentsPage,
    LikesPage,
    MenuPage,
    FriendProfilePage,
    FriendsPage,
    PendingRequestsPage,
    LoginPage,
    CreateAccountPage,
    EventsMapPage
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
    EventsManagerProvider,
    LikesProvider,
    FriendsProvider,
    NativeProvider,
    Network,
    Geolocation,
    OffersManagerProvider
  ]
})
export class AppModule { }