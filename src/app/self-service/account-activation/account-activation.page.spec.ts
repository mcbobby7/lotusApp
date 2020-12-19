import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountActivationPage } from './account-activation.page';

describe('AccountActivationPage', () => {
  let component: AccountActivationPage;
  let fixture: ComponentFixture<AccountActivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountActivationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
