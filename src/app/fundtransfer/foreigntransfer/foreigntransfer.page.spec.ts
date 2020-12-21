import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForeigntransferPage } from './foreigntransfer.page';

describe('ForeigntransferPage', () => {
  let component: ForeigntransferPage;
  let fixture: ComponentFixture<ForeigntransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeigntransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForeigntransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
