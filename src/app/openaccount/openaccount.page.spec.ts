import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenaccountPage } from './openaccount.page';

describe('OpenaccountPage', () => {
  let component: OpenaccountPage;
  let fixture: ComponentFixture<OpenaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
