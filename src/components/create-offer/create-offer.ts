import { Component } from '@angular/core';
import { Loading, NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastProvider } from '../../providers/toast/toast';
import { NativeProvider } from '../../providers/native/native';
import { OffersManagerProvider } from '../../providers/offers-manager/offers-manager';
import { Offer } from '../../models/models';

@Component({
  selector: 'create-offer',
  templateUrl: 'create-offer.html'
})
export class CreateOfferComponent {

  imageSrc: string;
  imageUploaded: boolean;
  offer: Offer;
  now: number;
  loader: Loading;
  autocomplete: any;

  constructor(
    private navCtrl: NavController,
    private actionSheet: ActionSheetController,
    private db: AngularFireDatabase,
    private toast: ToastProvider,
    private loadingCtrl: LoadingController,
    private offersManager: OffersManagerProvider,
    private native: NativeProvider
  ) {
    this.offer = {
      title: '',
      image: '',
      contactMobile: 0,
      contactEmail: '',
      description: '',
      location: '',
      locationCoords: { lat: 0, lng: 0 }
    };
    this.imageUploaded = false;
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento' });
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    let input = (<HTMLInputElement>document.getElementsByClassName("text-input-ios")[1]);
    let autocomplete = new google.maps.places.Autocomplete(input, { types: [], componentRestrictions: { country: "es" } });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let place = autocomplete.getPlace();
      let geometry = place.geometry;
      this.offer.location = place.formatted_address;
      if ((geometry) !== undefined) {
        this.offer.locationCoords.lat = geometry.location.lat();
        this.offer.locationCoords.lng = geometry.location.lng();
      };
    });
  }


  closePage() {
    this.navCtrl.pop();
  }

  selectImage() {
    this.native.getImage().then(imageData => {
      this.offer.image = imageData;
      this.imageSrc = imageData;
      this.imageUploaded = true;
    })
      .catch(err => console.log(err));
  }

  createOffer() {
    this.loader.present();
    this.offersManager.createOffer(this.offer)
      .then(() => {
        this.loader.dismiss();
        this.navCtrl.pop();
        this.toast.offerCreated();
      })
      .catch(err => console.log(err));
  }

}
