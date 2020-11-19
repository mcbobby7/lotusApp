import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestCardPage } from './request-card.page';

describe('RequestCardPage', () => {
  let component: RequestCardPage;
  let fixture: ComponentFixture<RequestCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
