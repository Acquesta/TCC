import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDoc, doc } from 'firebase/firestore';
import { db } from 'src/config/firebasedb';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  constructor(private rotaAtiva: ActivatedRoute) { }

  id:any;
  idp:any;

  produto:any;

  async ngOnInit() {
    this.id = this.rotaAtiva.snapshot.params['id']
    this.idp = this.rotaAtiva.snapshot.params['idp']

    const achaproduto = await getDoc(doc(db, this.id, 'produtos', 'produtos', this.idp))
    console.log(achaproduto.data())
    this.produto = achaproduto.data()
  }

}
