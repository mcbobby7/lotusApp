import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapturebiometricPage } from './capturebiometric.page';

describe('CapturebiometricPage', () => {
  let component: CapturebiometricPage;
  let fixture: ComponentFixture<CapturebiometricPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturebiometricPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapturebiometricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
