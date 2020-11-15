import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultStateComponent } from './result-state.component';

describe('ResultStateComponent', () => {
  let component: ResultStateComponent;
  let fixture: ComponentFixture<ResultStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
