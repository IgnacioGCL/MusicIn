import { Injectable } from '@angular/core';
import { Offer } from '../../models/models';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class OffersManagerProvider {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {

  }

  public getOffers(): Observable<Offer[]> {
    return this.db.list(`/offers`)
      .valueChanges().map(events => events.reverse()) as Observable<Offer[]>
  }

  public createOffer(offer: Offer): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.list(`/offers`).push({}).then(success => {
        this.storage.ref(`/offers/${success.key}.jpg`).putString(offer.image, 'data_url').then(snapshot => {
          this.db.object(`/offers/${success.key}`).set({
            title: offer.title,
            description: offer.description,
            id: success.key,
            location: offer.location,
            locationCoords: offer.locationCoords,
            contactNumber: offer.contactMobile,
            contactEmail: offer.contactEmail,
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
