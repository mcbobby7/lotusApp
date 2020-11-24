import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmountPage } from './amount.page';

describe('AmountPage', () => {
  let component: AmountPage;
  let fixture: ComponentFixture<AmountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
