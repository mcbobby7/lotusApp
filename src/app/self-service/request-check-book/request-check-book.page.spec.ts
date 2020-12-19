import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestCheckBookPage } from './request-check-book.page';

describe('RequestCheckBookPage', () => {
  let component: RequestCheckBookPage;
  let fixture: ComponentFixture<RequestCheckBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCheckBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestCheckBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
