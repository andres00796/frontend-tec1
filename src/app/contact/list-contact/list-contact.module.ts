import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListContactPageRoutingModule } from './list-contact-routing.module';

import { ListContactPage } from './list-contact.page';
import { MenuPage } from 'src/app/menu/menu.page';
import { MenuComponent } from 'src/app/menu/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContactPageRoutingModule
  ],
  declarations: [ListContactPage,MenuPage]
})
export class ListContactPageModule {}
