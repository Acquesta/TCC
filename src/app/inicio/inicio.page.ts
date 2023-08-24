import { Component, OnInit } from "@angular/core";
import auth from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "src/config/firebasedb";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  constructor() {}

  nome: any;

  user = auth.currentUser;

  ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);

        const querySnapshot = await getDocs(collection(db, uid));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          const db = doc.data()

          this.nome = db['nome']

          console.log(this.nome)
        });

      } 
    });
  }
}
