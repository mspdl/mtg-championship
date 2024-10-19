/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewRoundComponent } from './new-round.component';

describe('NewRoundComponent', () => {
  let component: NewRoundComponent;
  let fixture: ComponentFixture<NewRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
