import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreezeAccountPageRoutingModule } from './freeze-account-routing.module';

import { FreezeAccountPage } from './freeze-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreezeAccountPageRoutingModule
  ],
  declarations: [FreezeAccountPage]
})
export class FreezeAccountPageModule {}
