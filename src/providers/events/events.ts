import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EventsProvider {

  constructor(private db: AngularFireDatabase) {

  }

  public getEvents(): Observable<Event[]>{
    return this.db.list(`/events`)
      .valueChanges().map(events => events.reverse()) as Observable<Event[]>
  }

}
