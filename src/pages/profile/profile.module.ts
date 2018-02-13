import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { PipesModule } from '../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';


@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        PipesModule,
        MomentModule        
    ],
    entryComponents: [
        ProfilePage
    ]
})
export class ProfilePageModule { }