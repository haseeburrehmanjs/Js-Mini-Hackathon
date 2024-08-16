import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";

let login_btn = document.querySelector('#login_btn')
let article_section = document.querySelector('#article_section')
let login_div = document.querySelector('#login_div')

let userArticle = []
let fullName = null

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user;
    console.log(uid);
    console.log('user login ha');
    login_div.innerHTML = `<a href="./dashbord.html"><button class="btn btn-danger">DashBord</button></a>`
  } else {
    console.log('user login nahi ha');
  }
});

async function geTData() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  const querySnapshot1 = await getDocs(collection(db, "users"));

  querySnapshot1.forEach((doc) => {
    fullName = doc.data().first_name + ' ' + doc.data().last_name
    console.log(fullName);
  })
  querySnapshot.forEach((doc) => {
    userArticle.push(doc.data())
  });
  renderScreen()
}
geTData()

function renderScreen() {
  userArticle.map((item, index) => {
    article_section.innerHTML += `<div class="card">
  <div class="card-header">
    <div class="d-flex justify-content-between align-items-center">
    <h4>${fullName}</h4>
    <h6>${item.createdAt}</h6>
    </div>
  </div>
  <div class="card-body">
    <h2 class="card-title text-center">${item.title}</h2>
    <p class="card-text mt-3 text-center">${item.article}</p>
  </div>
</div>`
  })
}
renderScreen()

login_btn.addEventListener('click', () => {
  window.location = './login.html'
})


