import { NgModule } from '@angular/core';
import { WriteMessageComponent } from './write-message/write-message';
import { EventDetailsComponent } from './event-details/event-details';
import { OfferDetailsComponent } from './offer-details/offer-details';
import { CreateEventComponent } from './create-event/create-event';
import { CreateOfferComponent } from './create-offer/create-offer';
@NgModule({
	declarations: [WriteMessageComponent,
    EventDetailsComponent,
    OfferDetailsComponent,
    CreateEventComponent,
    CreateOfferComponent],
	imports: [],
	exports: [WriteMessageComponent,
    EventDetailsComponent,
    OfferDetailsComponent,
    CreateEventComponent,
    CreateOfferComponent]
})
export class ComponentsModule {}
