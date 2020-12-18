import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneratestatementPage } from './generatestatement.page';

describe('GeneralstatementPage', () => {
  let component: GeneratestatementPage;
  let fixture: ComponentFixture<GeneratestatementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratestatementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratestatementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
