import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChequedepositInputPage } from './chequedeposit-input.page';

describe('ChequedepositInputPage', () => {
  let component: ChequedepositInputPage;
  let fixture: ComponentFixture<ChequedepositInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequedepositInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChequedepositInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
