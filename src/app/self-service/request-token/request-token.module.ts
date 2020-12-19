import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestTokenPageRoutingModule } from './request-token-routing.module';

import { RequestTokenPage } from './request-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestTokenPageRoutingModule
  ],
  declarations: [RequestTokenPage]
})
export class RequestTokenPageModule {}
