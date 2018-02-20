import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from './../../interfaces/heroe.interface';
import { HeroesService } from './../../service/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  // tslint:disable-next-line:no-inferrable-types
  nuevo: boolean = false;
  id: string;

  constructor(private router: Router,
    private _heroesServices: HeroesService,
    private route: ActivatedRoute) {
      this.route.params.subscribe( parametros => {
        this.id = parametros['id'];
        if (this.id !== 'nuevo') {
          this._heroesServices.getHeroe(this.id)
          .subscribe( heroe => this.heroe = heroe );
        }
      });
    }

  ngOnInit() {
  }

  guardar() {
    // Post
    if (this.id === 'nuevo') {
      this._heroesServices.nuevoHeroe(this.heroe)
        .subscribe(data => {
          this.router.navigate(['/heroes']);
        },
        error => console.error(error));
    } else {
    // Put
      this._heroesServices.actualizarHeroe(this.heroe, this.id)
        .subscribe(data => {
          this.router.navigate(['/heroes']);
        },
        error => console.error(error));
    }
  }

  agregarNuevo (forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({casa: 'Marvel'});
  }
}
