import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocaltransferdetailsPageRoutingModule } from './localtransferdetails-routing.module';

import { LocaltransferdetailsPage } from './localtransferdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocaltransferdetailsPageRoutingModule
  ],
  declarations: [LocaltransferdetailsPage]
})
export class LocaltransferdetailsPageModule {}
