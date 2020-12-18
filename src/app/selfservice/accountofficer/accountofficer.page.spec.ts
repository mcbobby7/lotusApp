import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountofficerPage } from './accountofficer.page';

describe('AccountofficerPage', () => {
  let component: AccountofficerPage;
  let fixture: ComponentFixture<AccountofficerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountofficerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountofficerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
