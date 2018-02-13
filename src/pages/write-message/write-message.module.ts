import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteMessageComponent } from './write-message';


@NgModule({
    declarations: [
        WriteMessageComponent
    ],
    imports: [
        IonicPageModule.forChild(WriteMessageComponent)
    ],
    entryComponents:[
        WriteMessageComponent
    ]
})
export class WriteMessageModule { }