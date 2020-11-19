import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomercarePage } from './customercare.page';

describe('CustomercarePage', () => {
  let component: CustomercarePage;
  let fixture: ComponentFixture<CustomercarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercarePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomercarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
