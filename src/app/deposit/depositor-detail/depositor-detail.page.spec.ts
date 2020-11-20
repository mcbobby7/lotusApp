import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepositorDetailPage } from './depositor-detail.page';

describe('DepositorDetailPage', () => {
  let component: DepositorDetailPage;
  let fixture: ComponentFixture<DepositorDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositorDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepositorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
