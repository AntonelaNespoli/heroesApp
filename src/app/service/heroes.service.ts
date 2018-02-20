import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  // POST
  // tslint:disable-next-line:no-inferrable-types
  heroesURL: string = 'https://heroesapp-62bcc.firebaseio.com/heroes.json';
  // PUT
  // tslint:disable-next-line:no-inferrable-types
  heroeURL: string = 'https://heroesapp-62bcc.firebaseio.com/heroes/';
  constructor(private http: Http) { }

  nuevoHeroe ( heroe: Heroe ) {
    // tslint:disable-next-line:prefer-const
    let body = JSON.stringify(heroe);
    // tslint:disable-next-line:prefer-const
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.heroesURL, body, { headers })
          .map( res => {
            return res.json();
    });
  }

  actualizarHeroe ( heroe: Heroe, key$: string ) {
    // tslint:disable-next-line:prefer-const
    let body = JSON.stringify(heroe);
    // tslint:disable-next-line:prefer-const
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    // tslint:disable-next-line:prefer-const
    let url = `${ this.heroeURL }/${ key$ }.json `;
    return this.http.put( url, body, { headers })
          .map( res => {
            return res.json();
    });
  }

  getHeroe( key$: string) {
    let url = `${ this.heroeURL }/${ key$ }.json`;
    return this.http.get( url )
    .map(res => res.json());
  }

  getHeroes() {
    return this.http.get( this.heroesURL )
    .map(res => res.json());
  }

  deleteHeroe( key$: string ) {
    let url = `${ this.heroeURL }/${ key$ }.json `;
    return this.http.delete( url )
    .map(res => res.json());
  }

}
