import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FreezeAccountPage } from './freeze-account.page';

describe('FreezeAccountPage', () => {
  let component: FreezeAccountPage;
  let fixture: ComponentFixture<FreezeAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezeAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FreezeAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
