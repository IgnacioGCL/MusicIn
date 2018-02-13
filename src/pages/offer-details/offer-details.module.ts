import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferDetailsComponent } from './offer-details';


@NgModule({
    declarations: [
        OfferDetailsComponent
    ],
    imports: [
        IonicPageModule.forChild(OfferDetailsComponent)
    ],
    entryComponents:[
        OfferDetailsComponent
    ]
})
export class OfferDetailsModule { }