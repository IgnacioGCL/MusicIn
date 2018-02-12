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

  public eventCreated(){
    return this.toastCtrl.create({
      message: 'Evento creado con éxito',
      duration: 2000,
      position: 'bottom'
    }).present();
  }

}