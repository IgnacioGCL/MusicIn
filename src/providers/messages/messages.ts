import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessageInfo } from '../../models/models';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  constructor(private db: AngularFireDatabase) {

  }

  public getMessages(): Observable<MessageInfo[]>{
    let messageTest: MessageInfo = {
      photoUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/marty-avatar.png',
      name: 'Marty',
      text: 'El otro día escuché un concierto de David Gilmour y me encantó',
      role: 'Músico'
    };
    let res: MessageInfo[] = [];
    return new Observable(observer => {
      for (let i = 0; i < 6; i++) {
        res.push(messageTest);
      }
      observer.next(res);
    });
  }

}
