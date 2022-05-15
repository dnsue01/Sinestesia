import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  //recoger el i del album
  @Input() idAlbum = "";

  //recoger el nombre
  @Input() nombre = "";
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.idAlbum);
    
  }
  

}
