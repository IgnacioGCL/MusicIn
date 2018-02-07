import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessageInfo } from '../../models/models';
import { ProfileProvider } from '../profile/profile';


@Injectable()
export class MessagesProvider {

  urlRegex: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  constructor(private db: AngularFireDatabase, private profileProvider: ProfileProvider) {

  }

  public getMessages(): Observable<MessageInfo[]> {
    return this.db.list(`/users/${this.profileProvider.getProfileInfo().id}/messages`)
      .valueChanges().map(messages => messages.reverse()) as Observable<MessageInfo[]>;
  }

  public writeMessage(message: string): Promise<any> {
    var youtubeUrl: string;
    return new Promise((resolve, reject) => {
      if (this.thereIsYoutubeUrl(message)) {
        youtubeUrl = this.extractYoutubeUrl(message);
      }
      const date = new Date().getTime();
      this.db.list(`/users/${this.profileProvider.getProfileInfo().id}}/messages`).push({})
        .then(success => {
          const messageData: MessageInfo = {
            text: message,
            id: success.key,
            youtubeUrl: youtubeUrl || null,
            comments: 0,
            likes: 0,
            photoUrl: this.profileProvider.getProfileInfo().photoUrl,
            role: this.profileProvider.getProfileInfo().role,
            name: this.profileProvider.getProfileInfo().name,
            date: date
          }
          this.db.object(`/users/${this.profileProvider.getProfileInfo().id}/messages/${success.key}`).set(messageData)
            .then(() => resolve())
            .catch(err => reject(err));
        }, err => reject(err));
    });
  }

  private thereIsYoutubeUrl(message: string): boolean {
    if (this.urlRegex.test(message)) {
      if (message.includes('youtube.com') || message.includes('youtu.be')) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  private extractYoutubeUrl(message: string): string {
    let youtubeUrl = message.match(this.urlRegex)[0];
    if (message.includes('youtube.com')) {
      return youtubeUrl.replace('watch?v=', 'embed/');
    } else {
      return youtubeUrl.replace('youtu.be', 'youtube.com/embed');
    }
  }

}