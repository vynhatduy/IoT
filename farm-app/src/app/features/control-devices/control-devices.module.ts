import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlDevicesPageRoutingModule } from './control-devices-routing.module';

import { ControlDevicesPage } from './control-devices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlDevicesPageRoutingModule
  ],
  declarations: [ControlDevicesPage]
})
export class ControlDevicesPageModule {}
