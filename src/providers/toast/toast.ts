import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController) { }

  public messageTooShort() {
    return this.toastCtrl.create({
      message: 'El mensaje es demasiado corto',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public messageWritten() {
    return this.toastCtrl.create({
      message: 'Mensaje compartido con éxito',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public errorInMessage() {
    return this.toastCtrl.create({
      message: 'Inténtelo en otro momento :(',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public eventCreated() {
    return this.toastCtrl.create({
      message: 'Evento creado con éxito',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public errorInRequest() {
    return this.toastCtrl.create({
      message: 'Ha habido un error al procesar la solicitud, inténtelo más tarde',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public successInRequest() {
    return this.toastCtrl.create({
      message: 'Se ha aceptado la solicitud de amistad',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public requestSent() {
    return this.toastCtrl.create({
      message: 'Se ha enviado la solicitud de amistad',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public offerCreated() {
    return this.toastCtrl.create({
      message: 'Se ha creado la oferta correctamente',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public errorInMap() {
    return this.toastCtrl.create({
      message: 'Ha habido un problema al cargar el mapa. Inténtelo más tarde.',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  public errorInCreatingChatNoFriends() {
    return this.toastCtrl.create({
      message: 'No tienes amigos con los que poder iniciar una conversación, ¡agrega a uno para empezar!',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}
