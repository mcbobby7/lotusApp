import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfservicePage } from './selfservice.page';

describe('SelfservicePage', () => {
  let component: SelfservicePage;
  let fixture: ComponentFixture<SelfservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfservicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
