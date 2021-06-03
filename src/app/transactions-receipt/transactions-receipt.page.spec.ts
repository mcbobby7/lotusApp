import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionsReceiptPage } from './transactions-receipt.page';

describe('TransactionsReceiptPage', () => {
  let component: TransactionsReceiptPage;
  let fixture: ComponentFixture<TransactionsReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsReceiptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
