import { NgModule } from '@angular/core';
import { WriteMessageComponent } from './write-message/write-message';
import { EventDetailsComponent } from './event-details/event-details';
@NgModule({
	declarations: [WriteMessageComponent,
    EventDetailsComponent],
	imports: [],
	exports: [WriteMessageComponent,
    EventDetailsComponent]
})
export class ComponentsModule {}
