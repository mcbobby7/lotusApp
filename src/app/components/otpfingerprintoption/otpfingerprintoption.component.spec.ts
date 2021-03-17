import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpfingerprintoptionComponent } from './otpfingerprintoption.component';

describe('OtpfingerprintoptionComponent', () => {
  let component: OtpfingerprintoptionComponent;
  let fixture: ComponentFixture<OtpfingerprintoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpfingerprintoptionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpfingerprintoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
