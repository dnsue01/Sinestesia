import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  @Input() nombre="";
  
  constructor() { }

  ngOnInit(): void {
  }

}
