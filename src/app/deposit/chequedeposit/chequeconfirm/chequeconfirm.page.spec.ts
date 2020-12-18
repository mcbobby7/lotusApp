import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChequeconfirmPage } from './chequeconfirm.page';

describe('ChequeconfirmPage', () => {
  let component: ChequeconfirmPage;
  let fixture: ComponentFixture<ChequeconfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeconfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChequeconfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
