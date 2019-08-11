import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClayoutComponent } from './clayout.component';

describe('ClayoutComponent', () => {
  let component: ClayoutComponent;
  let fixture: ComponentFixture<ClayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
