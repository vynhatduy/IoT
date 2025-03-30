import { Component } from '@angular/core';
import { ScreenOrientationService } from './web/screen-orientation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public showTabs: boolean = true;

  constructor(private screenOrientationService: ScreenOrientationService) {}

  tabClicked(tab: string): void {
    switch (tab) {
      case 'dashboard':
      case 'control-devices':
      case 'map':
        this.screenOrientationService.setPortrait();
        break;
      case 'statistics':
        this.screenOrientationService.setLandScape();
        break;
      default:
        this.screenOrientationService.setPortrait();
        break;
    }
  }
}
