import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Login } from '../../models/models';
import { ProfileProvider } from '../../providers/profile/profile';
import { CreateAccountPage } from '../create-account/create-account';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  userLogin: Login = { email: '', password: '' };
  loader: Loading;

  constructor(public navCtrl: NavController, private profile: ProfileProvider, private loadingCtrl: LoadingController) {
  }

  login(): void {
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento...' });
    this.loader.present();
    this.profile.userLogin(this.userLogin.email, this.userLogin.password)
      .then(() => {
        this.loader.dismiss();
        this.navCtrl.push(MenuPage);
      })
      .catch(err => {
        console.log(err);
        this.loader.dismiss();
      })
  }

  goToCreateAccount(): void {
    this.navCtrl.push(CreateAccountPage);
  }

}
