import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessageInfo, Comment } from '../../models/models';
import { ProfileProvider } from '../profile/profile';
import _ from 'lodash';


@Injectable()
export class MessagesProvider {

  urlRegex: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  userId: string;

  constructor(private db: AngularFireDatabase, private profileProvider: ProfileProvider) {
  }

  public getMessages(): Observable<MessageInfo[]> {
    let homeMessages = [];
    return new Observable(observer => {
      this.db.list(`/users/${this.profileProvider.getProfileInfo().id}/timeline`)
        .valueChanges()
        .map(messages => messages.reverse())
        .subscribe(messages => {
          if (messages.length > 0) {
            let promises = [];
            messages.forEach((message: any) => {
              promises.push(this.db.object(`users/${message.userId}/messages/${message.messageId}/content`).valueChanges());
            });
            Observable.combineLatest(...promises).subscribe(messages => {
              homeMessages = _.orderBy(messages, 'date', 'desc');
              observer.next(homeMessages);
            });
          } else {
            observer.next([]);
          }
        });
    });
  }

  public writeMessage(message: string): Promise<any> {
    var youtubeUrl: string;
    return new Promise((resolve, reject) => {
      if (this.thereIsYoutubeUrl(message)) {
        youtubeUrl = this.extractYoutubeUrl(message);
      }
      const date = new Date().getTime();
      this.db.list(`/users/${this.profileProvider.getProfileInfo().id}}/messages/`).push({})
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
            date: date,
            userId: this.profileProvider.getProfileInfo().id
          }
          this.db.object(`/users/${this.profileProvider.getProfileInfo().id}/messages/${success.key}/content`).set(messageData)
            .then(() => {
              this.writeInTimelines(success.key, this.profileProvider.getProfileInfo().id).then(() => resolve());
            })
            .catch(err => reject(err));
        }, err => reject(err));
    });
  }

  public getCommentsFromMessage(messageId: string, userId: string): Observable<Comment[]> {
    return this.db.list(`users/${userId}/messages/${messageId}/comments`)
      .valueChanges() as Observable<Comment[]>;
  }

  public writeComment(message: string, userId: string, messageId: string): Promise<any> {
    let promises = [];
    const date = new Date().getTime();
    return new Promise((resolve, reject) => {
      this.db.object(`/users/${userId}/messages/${messageId}/content`)
        .valueChanges()
        .first()
        .toPromise().then((messageContent: any) => {
          promises.push(this.db.list(`/users/${userId}/messages/${messageId}/comments`).push({
            date,
            message,
            userId
          }));
          const commentsNumber = messageContent.comments + 1;
          promises.push(this.db.object(`/users/${userId}/messages/${messageId}/content/comments`).set(commentsNumber));
          Promise.all(promises).then(() => resolve());
        }).catch(err => reject(err));
    });
  }

  public getMoreInfoFromUser(userId: string): Promise<any> {
    return this.db.object(`/users/${userId}/profile`)
      .valueChanges()
      .first()
      .toPromise()
      .then((info: any) => ({ name: info.name, photoUrl: info.photoUrl }));
  }

  private writeInTimelines(messageId: string, userId: string): Promise<boolean> {
    const promises = [];
    return new Promise((resolve, reject) => {
      return this.db.list(`users`).snapshotChanges().subscribe(users => {
        users.forEach(user => {
          const set = this.db.object(`users/${user.key}/timeline/${messageId}`).set({
            messageId: messageId,
            userId: userId
          });
          promises.push(set);
        });
        Promise.all(promises).then(() => resolve(true)).catch(err => {
          console.log(err);
          reject(false);
        });
      });
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