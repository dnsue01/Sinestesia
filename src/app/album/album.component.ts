import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() nombre = "";
  @Input() idAlbum = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  

}