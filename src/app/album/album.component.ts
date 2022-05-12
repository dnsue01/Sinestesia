import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() nombre = "";
  @Input() idAlbum = "";

  constructor() { }

  ngOnInit(): void {
  }

}
