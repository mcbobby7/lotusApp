import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomeraccountlistPage } from './customeraccountlist.page';

describe('CustomeraccountlistPage', () => {
  let component: CustomeraccountlistPage;
  let fixture: ComponentFixture<CustomeraccountlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeraccountlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomeraccountlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
