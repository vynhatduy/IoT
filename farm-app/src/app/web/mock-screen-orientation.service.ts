import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockScreenOrientationService {
  // Định nghĩa các hằng ORIENTATIONS giống như trong service thật
  public ORIENTATIONS = {
    LANDSCAPE: 'landscape',
    PORTRAIT: 'portrait',
  };

  // Biến để lưu trạng thái hiện tại
  private _currentOrientation = 'portrait';

  constructor() {
    console.log('Using mock ScreenOrientation service');
  }

  // Giả lập hàm lock orientation
  lock(orientation: string): Promise<any> {
    console.log('Mock screen orientation lock:', orientation);
    this._currentOrientation = orientation;
    return Promise.resolve();
  }

  // Giả lập hàm unlock
  unlock(): Promise<any> {
    console.log('Mock screen orientation unlock');
    return Promise.resolve();
  }

  // Giả lập thuộc tính type
  get type(): string {
    return this._currentOrientation;
  }
}
