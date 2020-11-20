import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfServicePage } from './self-service.page';

describe('SelfServicePage', () => {
  let component: SelfServicePage;
  let fixture: ComponentFixture<SelfServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
