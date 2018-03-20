import { Component } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { NewUser } from '../../models/models';
import { ProfileProvider } from '../../providers/profile/profile';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  newUser: NewUser = { name: '', email: '', instrument: '', role: '', password: '' };
  passwordVisible: boolean = false;
  emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  loader: Loading;

  constructor(public navCtrl: NavController, private profile: ProfileProvider, private loadingCtrl: LoadingController) {
  }

  changePasswordVisbility() {
    this.passwordVisible = !this.passwordVisible;
  }

  createAccount() {
    let loader = this.loadingCtrl.create({ content: 'Creando cuenta' });
    loader.present();
    this.profile.createAccount(this.newUser).then(() => {
      loader.dismiss();
      this.navCtrl.push(MenuPage);
    }).catch(err => {
      console.log(err);
      loader.dismiss(); 
    });
  }


}
