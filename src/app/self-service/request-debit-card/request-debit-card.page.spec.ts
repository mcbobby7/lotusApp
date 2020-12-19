import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestDebitCardPage } from './request-debit-card.page';

describe('RequestDebitCardPage', () => {
  let component: RequestDebitCardPage;
  let fixture: ComponentFixture<RequestDebitCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDebitCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestDebitCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
