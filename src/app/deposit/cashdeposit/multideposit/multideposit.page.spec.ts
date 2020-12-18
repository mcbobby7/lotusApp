import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultidepositPage } from './multideposit.page';

describe('MultidepositPage', () => {
  let component: MultidepositPage;
  let fixture: ComponentFixture<MultidepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultidepositPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultidepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
