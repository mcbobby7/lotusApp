import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestTokenPage } from './request-token.page';

describe('RequestTokenPage', () => {
  let component: RequestTokenPage;
  let fixture: ComponentFixture<RequestTokenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTokenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
