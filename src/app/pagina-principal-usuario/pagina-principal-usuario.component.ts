import { Component, OnInit,Input } from '@angular/core';
@Component({
  selector: 'app-pagina-principal-usuario',
  templateUrl: './pagina-principal-usuario.component.html',
  styleUrls: ['./pagina-principal-usuario.component.scss']
})
export class PaginaPrincipalUsuarioComponent implements OnInit {

  @Input() nombre="";
  constructor() { }

  ngOnInit(): void {
  
  }

}
