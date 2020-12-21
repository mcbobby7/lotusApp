import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntltrfdetailsPageRoutingModule } from './intltrfdetails-routing.module';

import { IntltrfdetailsPage } from './intltrfdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntltrfdetailsPageRoutingModule
  ],
  declarations: [IntltrfdetailsPage]
})
export class IntltrfdetailsPageModule {}
