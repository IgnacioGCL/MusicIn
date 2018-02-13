import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOfferComponent } from './create-offer';


@NgModule({
    declarations: [
        CreateOfferComponent
    ],
    imports: [
        IonicPageModule.forChild(CreateOfferComponent)
    ],
    entryComponents:[
        CreateOfferComponent
    ]
})
export class CreateOfferModule { }