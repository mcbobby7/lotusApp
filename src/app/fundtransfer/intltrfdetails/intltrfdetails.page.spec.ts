import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntltrfdetailsPage } from './intltrfdetails.page';

describe('IntltrfdetailsPage', () => {
  let component: IntltrfdetailsPage;
  let fixture: ComponentFixture<IntltrfdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntltrfdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntltrfdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
