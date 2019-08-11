import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheaderComponent } from './cheader.component';

describe('CheaderComponent', () => {
  let component: CheaderComponent;
  let fixture: ComponentFixture<CheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
