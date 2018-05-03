import { Component } from '@angular/core';
import { NavController, AlertController, AlertOptions, Loading, LoadingController } from 'ionic-angular';
import { ChatsManagerProvider } from '../../providers/chats-manager/chats-manager';
import { Chat } from '../../models/models';
import { FriendsProvider } from '../../providers/friends/friends';
import { ToastProvider } from '../../providers/toast/toast';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  chats: Chat[];

  constructor(
    private navCtrl: NavController,
    private chatsManager: ChatsManagerProvider,
    private alertCtrl: AlertController,
    private friendsProvider: FriendsProvider,
    private toastProvider: ToastProvider,
    private loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad(): void {
    this.chatsManager.getChats().subscribe(chats => {
      this.chats = chats
    });
  }


  createChat(): void {
    let loader: Loading = this.loadingCtrl.create({ content: 'Espere un momento' });
    this.friendsProvider.getFriends().then(friends => {
      if (friends.length > 0) {
        let alertOptions: AlertOptions = {
          title: '¿Con quién quieres iniciar un chat?',
          inputs: [],
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => { }
            },
            {
              text: 'Ok',
              handler: data => {
                if (data) {
                  loader.present();
                  let friend = friends.find(friend => friend.id === data);
                  this.chatsManager.createChat(friend);
                  loader.dismiss();
                }
              }
            }
          ]
        };
        friends.forEach(friend => {
          alertOptions.inputs.push({ name: 'friends', type: 'radio', value: friend.id, label: friend.name });
        });
        this.alertCtrl.create(alertOptions).present();
      } else {
        this.toastProvider.errorInCreatingChatNoFriends();
      }
    });
  }

  goToChat(chatRoomId: string, friendName: string): void {
    this.navCtrl.push(ChatPage, { chatRoomId, friendName });
  }

  deleteChat(chatRoomId: string, friendName: string): void {
    this.alertCtrl.create({
      title: 'Eliminar chat',
      message: `¿Estás seguro que deseas eliminar el chat con ${friendName}? Esta acción no se puede deshacer`,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: () => {
            this.chatsManager.deleteChat(chatRoomId)
          }
        }
      ]
    }).present();
  }

}
