import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListContactPage } from './list-contact.page';

const routes: Routes = [
  {
    path: '',
    component: ListContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListContactPageRoutingModule {}
