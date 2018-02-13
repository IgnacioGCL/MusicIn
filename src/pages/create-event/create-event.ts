import { Component } from '@angular/core';
import { ActionSheetController, NavController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../../models/models';
import { ToastProvider } from '../../providers/toast/toast';


@IonicPage({
  name: 'create-event'
})
@Component({
  selector: 'create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventComponent {

  imageSrc: string;
  imageUploaded: boolean;
  event: Event;
  now: number;
  dateString: string;
  loader: Loading;

  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    private actionSheet: ActionSheetController,
    private datepicker: DatePicker,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private toast: ToastProvider,
    private loadingCtrl: LoadingController
  ) {
    this.dateString = '';
    this.event = {
      title: '',
      description: '',
      image: '',
      date: 0,
      location: ''
    };
    this.imageUploaded = false;
    this.loader = this.loadingCtrl.create({content: 'Espere un momento'});
  }

  closePage() {
    this.navCtrl.pop();
  }

  selectImage() {
    let actionSheet = this.actionSheet.create({
      title: 'Elija la fuente',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            const options: CameraOptions = {
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              targetWidth: 480,
              correctOrientation: true
            };
            this.camera.getPicture(options).then((imageData) => {
              imageData = 'data:image/jpeg;base64,' + imageData;
              this.event.image = imageData;
              this.imageSrc = imageData;
              this.imageUploaded = true;
            }, (err) => {
              console.log(err)
            });
          }
        },
        {
          text: 'Galería',
          handler: () => {
            const options: CameraOptions = {
              sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              targetWidth: 480,
              correctOrientation: true
            };
            this.camera.getPicture(options).then((imageData) => {
              imageData = 'data:image/jpeg;base64,' + imageData;
              this.event.image = imageData;
              this.imageSrc = imageData;
              this.imageUploaded = true;
            }, (err) => {
              console.log(err);
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

  chooseDate() {
    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      allowOldDates: false
    }).then(
      date => {
        this.event.date = date.getTime();
        this.dateString = this.getDateWithFormat(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  createEvent() {
    this.loader.present();
    this.db.list(`/events`).push({}).then(success => {
      this.storage.ref(`/events/${success.key}.jpg`).putString(this.event.image, 'data_url').then(snapshot => {
        this.db.object(`/events/${success.key}`).set({
          title: this.event.title,
          description: this.event.description,
          id: success.key,
          date: this.event.date,
          location: this.event.location,
          imageUrl: snapshot.downloadURL
        })
          .then(() => {
            this.loader.dismiss();
            this.navCtrl.pop();
            this.toast.eventCreated();
          })
          .catch(err => console.log(err));
      })
        .catch(err => console.log(err));
    }, err => console.log(err));
  }

  private getDateWithFormat(date: Date): string {
    if ((date.getMonth() + 1) < 10) {
      return date.getDate() + '/0' + (date.getMonth() + 1) + '/' + date.getFullYear();
    } else {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
  }

}
