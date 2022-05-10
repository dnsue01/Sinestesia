import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCancionComponent } from './crear-cancion.component';

describe('CrearCancionComponent', () => {
  let component: CrearCancionComponent;
  let fixture: ComponentFixture<CrearCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
