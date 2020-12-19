import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfertypePage } from './transfertype.page';

describe('TransfertypePage', () => {
  let component: TransfertypePage;
  let fixture: ComponentFixture<TransfertypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfertypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
