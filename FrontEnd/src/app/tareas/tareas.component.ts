import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: any[] = [];
  formulario: FormGroup = this.fb.group({
    nombre:[],
    completado:[false]
  });

  tareaEnEdicion: any;



  constructor(
    private tareaService: TareasService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  save(){
    const values = this.formulario.value;

    let request;

    if(this.tareaEnEdicion){
      request = this.tareaService.update(this.tareaEnEdicion._links.self.href, values);
    }else{
      request = this.tareaService.create(values);
    }

    request
      .subscribe({
        next: () => {
          this.cargarTareas();
          this.tareaEnEdicion = null;
          this.formulario.setValue({
            nombre: "",
            completado: false
          })
        },
        error: () => {}
      })
  }

  delete(tarea: any){
    const ok=confirm("Esta seguro de eliminar esta tarea?");
    if(ok){
      this.tareaService.delete(tarea._links.self.href)
        .subscribe(() => {
          this.cargarTareas();
      })
    }
  }

  edit(tarea: any){
    this.tareaEnEdicion = tarea;
    this.formulario.setValue({
      nombre: tarea.nombre,
      completado: tarea.completado
    })
  }

  cargarTareas(){
    this.tareaService.getAll()
    .subscribe((tareas: any) => {
      console.log("tareas", tareas);
      this.tareas = tareas._embedded.tareas;
    })
  }
}
