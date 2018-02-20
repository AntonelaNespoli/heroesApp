import { Component, OnInit } from '@angular/core';
import { HeroesService } from './../../service/heroes.service';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading: boolean = true;

  constructor(private _heroesServices: HeroesService) {
    this._heroesServices.getHeroes()
    .subscribe( heroes => {
      setTimeout( () => {
        this.loading = false;
        this.heroes = heroes;
      }, 2000);
    });
   }

  ngOnInit() {
  }

  delete( key$: string ) {
    this._heroesServices.deleteHeroe(key$)
    .subscribe( response => {
      if ( response) {
        console.error( response );
      } else {
        delete this.heroes[key$];
      }
    });
  }

}
