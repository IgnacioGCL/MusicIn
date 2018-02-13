import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersPage } from './offers';

@NgModule({
    declarations: [
        OffersPage
    ],
    imports: [
        IonicPageModule.forChild(OffersPage)
    ],
    entryComponents: [
        OffersPage
    ]
})
export class OffersPageModule { }