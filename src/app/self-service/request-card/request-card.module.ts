import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestCardPageRoutingModule } from './request-card-routing.module';

import { RequestCardPage } from './request-card.page';
import { ProcessingComponent } from 'src/app/processing/processing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestCardPageRoutingModule
  ],
  declarations: [RequestCardPage, ProcessingComponent]
})
export class RequestCardPageModule {}
