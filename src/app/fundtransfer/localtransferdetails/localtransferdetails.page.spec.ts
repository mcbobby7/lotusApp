import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocaltransferdetailsPage } from './localtransferdetails.page';

describe('LocaltransferdetailsPage', () => {
  let component: LocaltransferdetailsPage;
  let fixture: ComponentFixture<LocaltransferdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaltransferdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocaltransferdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
