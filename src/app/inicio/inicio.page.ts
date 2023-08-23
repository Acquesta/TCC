import { Component, OnInit } from '@angular/core';
import auth from 'src/config/firebasedb';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  nome: any;

  user = auth.currentUser;

  

}
