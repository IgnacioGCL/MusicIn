import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsPage } from './events';
import { MomentModule } from 'angular2-moment';

@NgModule({
    declarations: [
        EventsPage
    ],
    imports: [
        IonicPageModule.forChild(EventsPage),
        MomentModule
    ],
    entryComponents: [
        EventsPage
    ]
})
export class EventsPageModule { }