import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicioSesionComponent } from './pagina-inicio-sesion.component';

describe('PaginaInicioSesionComponent', () => {
  let component: PaginaInicioSesionComponent;
  let fixture: ComponentFixture<PaginaInicioSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaInicioSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaInicioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
