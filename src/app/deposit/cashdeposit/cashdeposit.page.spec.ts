import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashdepositPage } from './cashdeposit.page';

describe('CashdepositPage', () => {
  let component: CashdepositPage;
  let fixture: ComponentFixture<CashdepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashdepositPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashdepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
