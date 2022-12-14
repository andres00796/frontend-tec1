import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatailContactPageRoutingModule } from './datail-contact-routing.module';

import { DatailContactPage } from './datail-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatailContactPageRoutingModule
  ],
  declarations: [DatailContactPage]
})
export class DatailContactPageModule {}
