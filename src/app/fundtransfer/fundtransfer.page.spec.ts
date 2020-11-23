import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundtransferPage } from './fundtransfer.page';

describe('FundtransferPage', () => {
  let component: FundtransferPage;
  let fixture: ComponentFixture<FundtransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundtransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundtransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
