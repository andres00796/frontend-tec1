import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatailContactPage } from './datail-contact.page';

const routes: Routes = [
  {
    path: '',
    component: DatailContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatailContactPageRoutingModule {}
