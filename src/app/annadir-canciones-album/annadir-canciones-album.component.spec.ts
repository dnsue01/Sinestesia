import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnadirCancionesAlbumComponent } from './annadir-canciones-album.component';

describe('AnnadirCancionesAlbumComponent', () => {
  let component: AnnadirCancionesAlbumComponent;
  let fixture: ComponentFixture<AnnadirCancionesAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnadirCancionesAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnadirCancionesAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
