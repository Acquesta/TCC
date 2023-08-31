
import { Component, OnInit } from "@angular/core";
import { db } from "../../config/firebasedb";
import { collection, addDoc, getDocs, doc, getDoc, getDocFromCache  } from "firebase/firestore";
import auth from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { exibirToast } from "src/config/alert";

@Component({
  selector: "app-cadastroprod",
  templateUrl: "./cadastroprod.page.html",
  styleUrls: ["./cadastroprod.page.scss"],
})

export class CadastroprodPage implements OnInit {
  constructor() {}

  nome: any;
  quantidade: any;
  validade: any;
  precoProduto: any;

  uid: any;

  idProdutos: any = [];

  listaProdutos: any = [];

  async ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        console.log(this.uid);
      }
    });

  }

  cadastroProduto(
    nome: any,
    quantidade: any,
    validade: any,
    precoProduto: any
  ) {
    console.log(nome, quantidade, validade, precoProduto);

    const produto = {
      nome: nome,
      quantidade: quantidade,
      validade: validade,
      precoProduto: precoProduto,
    };

    try {
      const docRef = addDoc(
        collection(db, this.uid, "produtos", 'produtos'),
        produto
      )
      exibirToast('Produto cadastrado', 3000, 'success', 'top')
      console.log("Produto cadastrado");

    } catch (e) {
      console.log(e);
      exibirToast('Preciso colocar todas as informações', 4000, 'danger', 'top')
    }

    this.nome = '';
    this.quantidade = '';
    this.validade = '';
    this.precoProduto = '';

  }

}
