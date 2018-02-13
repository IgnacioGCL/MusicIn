import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEventComponent } from './create-event';


@NgModule({
    declarations: [
        CreateEventComponent
    ],
    imports: [
        IonicPageModule.forChild(CreateEventComponent)
    ],
    entryComponents:[
        CreateEventComponent
    ]
})
export class CreateEventModule { }