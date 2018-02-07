import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ToastProvider } from '../../providers/toast/toast';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the WriteMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'write-message',
  templateUrl: 'write-message.html'
})
export class WriteMessageComponent {

  message: string;
  disabled: boolean;

  constructor(private viewCtrl: ViewController, private toast: ToastProvider, private messagesProvider: MessagesProvider) {
    this.message = '';
    this.disabled = false;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  sendMessage() {
    if (this.message.length < 5) {
      this.toast.messageTooShort();
    } else {
      this.disabled = true;
      this.messagesProvider.writeMessage(this.message)
        .then(() => {
          this.toast.messageWritten();
          setTimeout(() => {
            this.viewCtrl.dismiss();
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          this.disabled = false;
          this.toast.errorInMessage();
        })
    }
  }

}
