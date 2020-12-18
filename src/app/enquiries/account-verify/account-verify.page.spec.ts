import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountVerifyPage } from './account-verify.page';

describe('AccountVerifyPage', () => {
  let component: AccountVerifyPage;
  let fixture: ComponentFixture<AccountVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountVerifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
