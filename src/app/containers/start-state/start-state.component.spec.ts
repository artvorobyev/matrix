import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStateComponent } from './start-state.component';

describe('StartStateComponent', () => {
  let component: StartStateComponent;
  let fixture: ComponentFixture<StartStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
