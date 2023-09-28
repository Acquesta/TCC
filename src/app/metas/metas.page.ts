import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
})
export class MetasPage implements OnInit {

  constructor(public router: Router) { }

  listaMetas: any;

  ngOnInit() {
  }

  paginaCriaMeta(){
    this.router.navigate(['../criameta'])
  }

}
