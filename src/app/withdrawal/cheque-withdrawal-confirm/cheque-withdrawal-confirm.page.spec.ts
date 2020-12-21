import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChequeWithdrawalConfirmPage } from './cheque-withdrawal-confirm.page';

describe('ChequeWithdrawalConfirmPage', () => {
  let component: ChequeWithdrawalConfirmPage;
  let fixture: ComponentFixture<ChequeWithdrawalConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeWithdrawalConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChequeWithdrawalConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
