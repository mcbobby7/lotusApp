import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocaltransfertypePage } from './localtransfertype.page';

describe('LocaltransfertypePage', () => {
  let component: LocaltransfertypePage;
  let fixture: ComponentFixture<LocaltransfertypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaltransfertypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocaltransfertypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
