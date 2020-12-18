import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingledepositPage } from './singledeposit.page';

describe('SingledepositPage', () => {
  let component: SingledepositPage;
  let fixture: ComponentFixture<SingledepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingledepositPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingledepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
