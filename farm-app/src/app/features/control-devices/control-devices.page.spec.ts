import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlDevicesPage } from './control-devices.page';

describe('ControlDevicesPage', () => {
  let component: ControlDevicesPage;
  let fixture: ComponentFixture<ControlDevicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDevicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
