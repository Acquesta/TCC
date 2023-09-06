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
  contaGrafico: any = [];
  porcentagens: any = [];

  grafico: any;
  porcentagem2: any;
  porcentagem3: any;
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

    this.grafico = 'background: conic-gradient( #DB5217 0%  100%);'

  }

  vender(produto:any){

    // Pega o preço do produto
    const precoProduto = parseInt(produto[0].precoProduto) 

    this.rendaM = parseInt(this.rendaM) + precoProduto
    this.rendaD = parseInt(this.rendaD) + precoProduto
    this.rendaS = parseInt(this.rendaS) + precoProduto

    // Adiocina as rendas 
    const updateRenda = updateDoc(doc(db, this.uid, this.id), {
      rendaD: this.rendaD,
      rendaS: this.rendaS,
      rendaM: this.rendaM  
    }).then(() => {
      exibirToast('Produto vendido', 2000, 'success', 'bottom')
    })

    // Data de hoje
    const date = new Date()
    console.log(date.getDate())

    // Adiciona a data da última venda
    const updateVenda = updateDoc(doc(db, this.uid, 'produtos', 'produtos', produto[1],), {
      venda: produto[0].venda + 1,
      ultimaVenda: {
        dia: date.getDate(),
        mes: date.getMonth(),
        ano: date.getFullYear()
      }
    }).then(() => {
      produto[0].venda += 1
      this.graficoProdutos()
    })

    this.rendas(produto[1])

  }

  graficoProdutos(){

    this.vendaTotal = 0
    this.contaGrafico = [];
    this.porcentagens = [];

    this.listaProdutos.forEach((produto:any) => {
      this.vendaTotal += produto[0].venda

      const conta = (produto[0].venda * 100)
      this.contaGrafico.push(conta)

      console.log('Preço produto: ' + produto[0]?.venda);
    });

    this.contaGrafico.forEach((porcentagem: any) => {
      const conta = porcentagem / this.vendaTotal
      this.porcentagens.push(conta)
      console.log(conta + '%')
    })

    this.porcentagens.sort((a: any, b: any) => b - a)

    console.log('Venda total: ' + this.vendaTotal);
    console.log(this.porcentagens)

    if(this.porcentagens.length >= 4){

      this.porcentagem2 = this.porcentagens[0] + this.porcentagens[1]
      this.porcentagem3 = this.porcentagem2 + this.porcentagens[2]
      this.porcentagem4 = this.porcentagem3 + this.porcentagens[3]

      this.grafico = 'background: conic-gradient( #7DE8FF 0% ' + this.porcentagens[0] + '%' + ' , #39A0FF ' + this.porcentagens[0] + '% ' + this.porcentagem2 + '%, #27CBFF' + this.porcentagem2 + '% ' + this.porcentagem3 + '% , #2717DB ' + this.porcentagem3 + '% 100%);'
    }
    
  }

  async rendas(idProduto: any){

    const date = new Date()

    const rendas = await getDocs(collection(db, this.uid, 'produtos', 'produtos', idProduto, 'ultimavenda'))
    console.log(rendas)
    // rendas.forEach((produto) => {
    //   console.log(produto)
    //   // if(date.getDate() != produto.ultimaVenda.dia)
    // });
  }

}
