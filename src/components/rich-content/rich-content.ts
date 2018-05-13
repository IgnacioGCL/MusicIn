import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { MessagesProvider } from '../../providers/messages/messages';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'rich-content',
  templateUrl: 'rich-content.html'
})
export class RichContentComponent {

  richContent: string;
  title: string;
  generalInformation: string;

  constructor(navParams: NavParams, private viewCtrl: ViewController, private messagesProvider: MessagesProvider) {
    this.richContent = navParams.get('artistOrBand');
    this.title = this.richContent.replace(/_/g, ' ');
    this.title = this.title.replace(/#/g, '');
  }

  ionViewDidLoad() {
    this.messagesProvider.getInfoFromRichContent(this.richContent)
      .subscribe(data => {
        let info = data.results.bindings;
        this.generalInformation = info[0].musicianInfo.value;
      }, err => {
        console.log(err.url);
      });
  }

  exitInfo() {
    this.viewCtrl.dismiss();
  }

}
