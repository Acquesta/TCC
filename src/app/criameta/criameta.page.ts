import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { exibirToast } from 'src/config/alert';
import auth, { db } from 'src/config/firebasedb';

@Component({
  selector: 'app-criameta',
  templateUrl: './criameta.page.html',
  styleUrls: ['./criameta.page.scss'],
})
export class CriametaPage implements OnInit {

  constructor(public router: Router) { }

  uid:any;

  tipoMeta: any;

  metaReais = true;
  metaDias = true;
  metaProduto = true;
  checkBox = true;

  nome:any;
  descricao:any;
  reais:any = '';
  dias:any = '';
  produto:any = '';
  produtoQuantidade:any = '';
  data:any = 'sem data pra terminar';

  // puxa o id do usuario
  async ngOnInit() {
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        this.uid = user.uid;
        console.log('id do usuario :' + this.uid);

      }
    })
  }  

  // deixa os inputs abilitados para cada tida do radio button
  onIonChange(ev: any) {
    // valor do radio button
    this.tipoMeta = ev.detail.value
    // console.log(this.tipoMeta);

    if(this.tipoMeta == 'reais'){
      this.metaReais = false
      this.metaDias = true;
      this.metaProduto = true;
    } else if(this.tipoMeta == 'dias'){
      this.metaDias = false
      this.metaReais = true
      this.metaProduto = true
    }else if (this.tipoMeta == 'produto'){
      this.metaProduto = false;
      this.metaReais = true
      this.metaDias = true;
    }
  }

  // adiciona um input para quantidade de produtos
  conclusao(ev: any){
    if(ev.detail.checked == true){
      this.checkBox = false
    }else if(ev.detail.checked == false){
      this.checkBox = true
    }
  }

  // adicionar meta
  adicionarMeta(){
    // transforma a data em um array 
    const dataSeparada = this.data.split('-')
    // console.log(dataSeparada);

    // estrutura da meta para o banco de dados
    const meta = {
      nome: this.nome,
      descricao: this.descricao,
      tipo: this.tipoMeta,
      reais: this.reais,
      dias: this.dias,
      produto: {
        nome: this.produto,
        quantidade: this.produtoQuantidade
      },
      dataConclusao: dataSeparada,
      porcentagem: '0%',
      status: 'não concluído'
    }
    
    // adiciona a meta no banco de dados
    try {
      addDoc(collection(db, this.uid, 'metas', 'metas'), meta).then(() => {
        console.log('Meta criada')
        exibirToast('Meta criada', 3000, 'success', 'top')
        this.router.navigate(['../metas'])
      })
    }
    catch (e) {
      console.log(e);
      
    }
    
  }

}
