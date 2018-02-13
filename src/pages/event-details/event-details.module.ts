import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailsComponent } from './event-details';



@NgModule({
    declarations: [
        EventDetailsComponent
    ],
    imports: [
        IonicPageModule.forChild(EventDetailsComponent),
    ],
    entryComponents:[
        EventDetailsComponent
    ]
})
export class EventDetailsModule { }