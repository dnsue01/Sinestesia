import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlayListComponent } from './lista-play-list.component';

describe('ListaPlayListComponent', () => {
  let component: ListaPlayListComponent;
  let fixture: ComponentFixture<ListaPlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
