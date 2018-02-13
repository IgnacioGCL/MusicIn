import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ToastProvider } from '../../providers/toast/toast';
import { MessagesProvider } from '../../providers/messages/messages';
import { IonicPage } from 'ionic-angular';


@IonicPage({
  name: 'write-message'
})
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
