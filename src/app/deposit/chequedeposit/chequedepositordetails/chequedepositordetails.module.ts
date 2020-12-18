import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequedepositordetailsPageRoutingModule } from './chequedepositordetails-routing.module';

import { ChequedepositordetailsPage } from './chequedepositordetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChequedepositordetailsPageRoutingModule
  ],
  declarations: [ChequedepositordetailsPage]
})
export class ChequedepositordetailsPageModule {}
