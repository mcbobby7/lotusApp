import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnquiriesPage } from './enquiries.page';

describe('EnquiriesPage', () => {
  let component: EnquiriesPage;
  let fixture: ComponentFixture<EnquiriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnquiriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
