import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatementPageRoutingModule } from './statement-routing.module';

import { StatementPage } from './statement.page';
import { ProcessingComponent } from 'src/app/processing/processing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatementPageRoutingModule
  ],
  declarations: [StatementPage, ProcessingComponent]
})
export class StatementPageModule {}
