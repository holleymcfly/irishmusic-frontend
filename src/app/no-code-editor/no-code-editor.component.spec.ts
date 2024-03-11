import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCodeEditorComponent } from './no-code-editor.component';

describe('NoCodeEditorComponent', () => {
  let component: NoCodeEditorComponent;
  let fixture: ComponentFixture<NoCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoCodeEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
