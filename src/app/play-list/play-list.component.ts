import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  //recoger el i del album
  @Input() idPlaylist = "";

  //recoger el nombre
  @Input() nombre = "";

  constructor() { }

  ngOnInit(): void {
    
  }

}
