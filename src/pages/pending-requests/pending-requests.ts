import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friends/friends';
import { Request } from '../../models/models';
import { ToastProvider } from '../../providers/toast/toast';


@Component({
  selector: 'page-pending-requests',
  templateUrl: 'pending-requests.html',
})
export class PendingRequestsPage {
  requests: Request[];
  loader: Loading;

  constructor(private friendsProvider: FriendsProvider, private loadingCtrl: LoadingController, private toast: ToastProvider) {
    this.friendsProvider.pendingRequests().subscribe( requests => {
      if(requests.length > 0){
        this.requests = requests;
      }
    });
  }

  acceptRequest(requestId: string, userId: string, userName: string) {
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento...' });
    this.friendsProvider.acceptRequest(requestId, userId, userName)
      .then(() => {
        this.loader.dismiss();
        this.toast.successInRequest();
      })
      .catch(err => {
        console.log(err);
        this.toast.errorInRequest();
        this.loader.dismiss();
      });
  }

  declineRequest(requestId: string, userId: string) {
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento...' });
    this.friendsProvider.declineRequest(requestId)
      .then(() => this.loader.dismiss())
      .catch(err => {
        console.log(err);
        this.toast.errorInRequest();
        this.loader.dismiss();
      });
  }

  trackById(index, item) {
    return item.id;
  }

}
