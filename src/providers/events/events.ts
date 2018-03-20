import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { Event } from '../../models/models';


@Injectable()
export class EventsProvider {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {

  }

  public getEvents(): Observable<Event[]> {
    return this.db.list(`/events`)
      .valueChanges().map(events => events.reverse()) as Observable<Event[]>
  }

  public createEvent(event: Event): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.list(`/events`).push({}).then(success => {
        this.storage.ref(`/events/${success.key}.jpg`).putString(event.image, 'data_url').then(snapshot => {
          this.db.object(`/events/${success.key}`).set({
            title: event.title,
            description: event.description,
            id: success.key,
            date: event.date,
            location: event.location,
            imageUrl: snapshot.downloadURL
          })
            .then(() => resolve())
            .catch(err => reject(err.code));
        })
          .catch(err => reject(err.code));
      }, err => reject(err.code));
    });
  }

}
