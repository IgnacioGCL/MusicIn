import { NgModule } from '@angular/core';
import { WriteMessageComponent } from './write-message/write-message';
import { EventDetailsComponent } from './event-details/event-details';
import { OfferDetailsComponent } from './offer-details/offer-details';
@NgModule({
	declarations: [WriteMessageComponent,
    EventDetailsComponent,
    OfferDetailsComponent],
	imports: [],
	exports: [WriteMessageComponent,
    EventDetailsComponent,
    OfferDetailsComponent]
})
export class ComponentsModule {}
