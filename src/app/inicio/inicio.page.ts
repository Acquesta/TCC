import { Component, OnInit } from "@angular/core";
import auth from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, doc, QuerySnapshot } from "firebase/firestore";
import { db } from "src/config/firebasedb";
import { userLogado } from "src/config/user";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  constructor() { }

  uid:any;
  nome: any;

  listaProdutos: any = [];

  async ngOnInit() {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        this.uid = user.uid;
        console.log('id do usuario :' + this.uid);

        const querySnapshot = await getDocs(collection(db, this.uid));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc);

          const db = doc.data()

          this.nome = db['nome']

          console.log(this.nome)

        });

      }

    });

  }
  
  async produto(){
    const querySnapshot = await getDocs(collection(db, this.uid, 'produtos', 'produtos'))
    querySnapshot.forEach((doc) =>{
    this.listaProdutos.push(doc.data())
    console.log(doc.data())
  })
  }

}
