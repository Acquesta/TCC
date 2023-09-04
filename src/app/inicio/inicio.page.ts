import { Component, OnInit } from "@angular/core";
import auth from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "src/config/firebasedb";
import { exibirToast } from "src/config/alert";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  constructor() { }

  uid:any;
  user: any;
  id: any;

  nome: any;
  rendaM: any;
  rendaS: any;
  rendaD: any;

  listaProdutos: any = [];
  idProdutos: any = [];

  vendaTotal: any = 0;

  grafico: any;
  porcentagem1: any = 25;
  porcentagem2: any = 25;
  porcentagem3: any = 100;
  porcentagem4: any;

  async ngOnInit() {

    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        this.uid = user.uid;
        console.log('id do usuario :' + this.uid);

        const querySnapshot = await getDocs(collection(db, this.uid));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc);

          this.user = doc.data()
          this.id = doc.id

          this.nome = this.user['nome']
          this.rendaM = this.user['rendaM']
          this.rendaS = this.user['rendaS']
          this.rendaD = this.user['rendaD']

        });

        const produtos = await getDocs(collection(db, this.uid, 'produtos', 'produtos'))
        produtos.forEach((doc) => {
          const produto = doc.data()
          this.listaProdutos.push([produto, doc.id])
          console.log(this.listaProdutos)
        })

      }

    });

    this.grafico = 'background: conic-gradient( #DB5217 0% ' + this.porcentagem1 + '%' + ' , #ED8144 ' + this.porcentagem1 + '% ' + this.porcentagem2 +'%);'

  }

  vender(produto:any){
    const precoProduto = parseInt(produto[0].precoProduto) 
    this.rendaM = parseInt(this.rendaM) + precoProduto

    const updateRenda = updateDoc(doc(db, this.uid, this.id), {
      rendaM: this.rendaM  
    }).then(() => {
      exibirToast('Produto vendido', 2000, 'success', 'bottom')
    })

    const updateVenda = updateDoc(doc(db, this.uid, 'produtos', 'produtos', produto[1],), {
      venda: produto[0].venda + 1
    }).then(() => {
      produto[0].venda += 1
      this.graficoProdutos()
    })

  }

  graficoProdutos(){
    this.listaProdutos.forEach((produto:any) => {
      this.vendaTotal += produto[0].venda
      console.log(produto ,produto[0]?.venda);
    });

    // console.log(this.vendaTotal);
    
  }

}
