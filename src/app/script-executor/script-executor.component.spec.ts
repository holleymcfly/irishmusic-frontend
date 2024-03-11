import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptExecutorComponent } from './script-executor.component';

describe('ScriptExecutorComponent', () => {
  let component: ScriptExecutorComponent;
  let fixture: ComponentFixture<ScriptExecutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScriptExecutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScriptExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
