import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForeigntransferCorrespondentPage } from './foreigntransfer-correspondent.page';

describe('ForeigntransferCorrespondentPage', () => {
  let component: ForeigntransferCorrespondentPage;
  let fixture: ComponentFixture<ForeigntransferCorrespondentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeigntransferCorrespondentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForeigntransferCorrespondentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
