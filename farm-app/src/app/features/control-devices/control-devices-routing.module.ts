import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlDevicesPage } from './control-devices.page';

const routes: Routes = [
  {
    path: '',
    component: ControlDevicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlDevicesPageRoutingModule {}
