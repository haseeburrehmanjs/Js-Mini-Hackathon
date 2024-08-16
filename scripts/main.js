import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { auth, db } from "../config.js";

let login_btn = document.querySelector('#login_btn')
let article_section = document.querySelector('#article_section')

let userArticle = []

async function geTData() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    userArticle.push(doc.data())
  });
}
geTData()

function renderScreen() {
  userArticle.map((item,index) => {
  console.log(item);
  })
}
renderScreen()

login_btn.addEventListener('click', () => {
    window.location = './login.html'
})