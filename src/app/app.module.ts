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
import { locale } from 'moment';

import { MyApp } from './app.component';
import { MessagesProvider } from '../providers/messages/messages';
import { environment } from '../environments/environment';
import { ProfileProvider } from '../providers/profile/profile';
import { ToastProvider } from '../providers/toast/toast';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import { EventsProvider } from '../providers/events/events';

locale('es-es');

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: 'ios', tabsHideOnSubPages: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
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