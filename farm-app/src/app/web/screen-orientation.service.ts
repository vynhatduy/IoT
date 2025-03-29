import { Injectable } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Injectable({
  providedIn: 'root',
})
export class ScreenOrientationService {
  constructor(private screenOrientation: ScreenOrientation) {}

  setLandScape(): void {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  setPortrait(): void {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  unlockOrientation(): void {
    this.screenOrientation.unlock();
  }

  getCurrentOrientation(): string {
    return this.screenOrientation.type;
  }
}
