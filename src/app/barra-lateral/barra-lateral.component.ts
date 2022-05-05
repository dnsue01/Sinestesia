import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss']
})
export class BarraLateralComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) { }

  nombre = this.route.snapshot.params["nombre"];
  opcion:string = "0";

  ngOnInit(): void {
  

  }
  Inicio(){
    this.opcion="inicio"
    console.log(this.opcion);
    
  }
  Ajustes(){
    this.opcion="ajustes"
  }


}
