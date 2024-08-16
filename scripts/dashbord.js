import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { auth, db } from "../config.js";

let title = document.querySelector('#title')
let logout_btn = document.querySelector('#logout_btn')
let article = document.querySelector('#article')
let form = document.querySelector('#form')
let article_section = document.querySelector('#article_section')

let userArticle = []

async function geTData() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  querySnapshot.forEach((doc) => {
    userArticle.push(doc.data())
    console.log(userArticle);
  });
  renderScreen()
}
geTData()

async function renderScreen() {
  article_section.innerHTML = ''
  userArticle.map((item, index) => {
    console.log(item);
    article_section.innerHTML += `<div class="card">
  <div class="card-header">
    <div class="d-flex justify-content-between align-items-center">
    <h1>Article</h1>
    <h6>${item.createdAt}</h6>
    </div>
  </div>
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <hr />
    <p class="card-text">${item.article}</p>
  </div>
</div>`
  })
}
renderScreen()

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    console.log('user login ha');

  } else {
    console.log('user login nahi ha');
    window.location = './login.html'
  }
});

form.addEventListener('submit', async event => {
  event.preventDefault()
  if (title.value === '' || article.value === '') {
    alert('please fill input')
  }
  else {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        title: title.value,
        article: article.value,
        createdAt: new Date().toISOString()
      });
      userArticle.push({
        title: title.value,
        article: article.value,
        createdAt: new Date().toISOString()
      })
      console.log(userArticle);
      console.log("Document written with ID: ", docRef.id);
      // geTData()
      renderScreen()
      title.value = ''
      article.value = ''
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

})

logout_btn.addEventListener('click', () => {
  console.log('logout');

  signOut(auth).then(() => {
    console.log('Sign-out successful.');
    window.location = './login.html'
  }).catch((error) => {

  });
})