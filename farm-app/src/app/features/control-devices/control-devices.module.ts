import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ControlDevicesPageRoutingModule } from './control-devices-routing.module';
import { ControlDevicesPage } from './control-devices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlDevicesPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [ControlDevicesPage],
})
export class ControlDevicesPageModule {}
