import { GeneratestatementPageRoutingModule } from './generatestatement-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GeneratestatementPage } from './generatestatement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratestatementPageRoutingModule,
  ],
  declarations: [GeneratestatementPage]
})
export class GeneratestatementPageModule {}
