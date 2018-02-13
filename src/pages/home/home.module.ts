import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        PipesModule,
        MomentModule
    ],
    entryComponents:[
        HomePage
    ]
})
export class HomePageModule { }