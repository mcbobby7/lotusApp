import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChequeWithdrawalPage } from './cheque-withdrawal.page';

describe('ChequeWithdrawalPage', () => {
  let component: ChequeWithdrawalPage;
  let fixture: ComponentFixture<ChequeWithdrawalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeWithdrawalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChequeWithdrawalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
