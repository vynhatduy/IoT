import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import cả service thật và service giả
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ScreenOrientationService } from './web/screen-orientation.service';
import { MockScreenOrientationService } from './web/mock-screen-orientation.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Nếu đang sử dụng dữ liệu mẫu, thì sử dụng service giả
    {
      provide: ScreenOrientation,
      useClass: environment.useMockData
        ? MockScreenOrientationService
        : ScreenOrientation,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
