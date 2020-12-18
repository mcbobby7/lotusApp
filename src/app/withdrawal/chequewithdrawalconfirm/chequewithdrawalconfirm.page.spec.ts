import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChequewithdrawalconfirmPage } from './chequewithdrawalconfirm.page';

describe('ChequewithdrawalconfirmPage', () => {
  let component: ChequewithdrawalconfirmPage;
  let fixture: ComponentFixture<ChequewithdrawalconfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequewithdrawalconfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChequewithdrawalconfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
