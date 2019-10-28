import { Component, OnInit } from '@angular/core';
import { Mark } from 'src/app/classes/mark.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  marcadores: Mark[]=[];
  lat = 4.634831;
  lng = -74.097468;
  constructor(private snackBar: MatSnackBar, public dialog:MatDialog) { 
    if(localStorage.getItem('marcadores')){
      this.marcadores=JSON.parse(localStorage.getItem('marcadores'))

    }
  
  }

  ngOnInit() {
  }

  agregarMarcador(evento){
    const coords:{ lat:number, lng:number}=evento.coords;
    console.log(evento);
    const nuevoMarcador=new Mark(coords.lat,coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage()
    this.snackBar.open('Marcador Agregado', 'Cerrar',{
      duration: 2000
    })

  }

  borrarMarcador(i:number){

    this.marcadores.splice(i,1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar',{
      duration: 2000
    })
  }

  editarMarcador(marcador:Mark){
    const dialogRef= this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(!result){
        return;
      }
      marcador.titulo=result.titulo;
      marcador.desc=result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar',{
        duration: 2000
      })
      
    });

  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores))
  }
}
