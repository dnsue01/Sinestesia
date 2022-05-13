import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-annadir-canciones-album',
  templateUrl: './annadir-canciones-album.component.html',
  styleUrls: ['./annadir-canciones-album.component.scss']
})
export class AnnadirCancionesAlbumComponent implements OnInit {

  constructor() { }
  //recojo del padre
  @Input() nombre = "";

  ngOnInit(): void {
  }

}
