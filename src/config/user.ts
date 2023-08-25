import { onAuthStateChanged } from "firebase/auth";


export async function userLogado(auth:any){
    onAuthStateChanged(auth,async (user) => {
        return user
    })
}