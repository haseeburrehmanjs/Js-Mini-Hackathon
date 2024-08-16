import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { auth, db } from "../config.js";

let title = document.querySelector('#title')
let logout_btn = document.querySelector('#logout_btn')
let article = document.querySelector('#article')
let form = document.querySelector('#form')
let article_section = document.querySelector('#article_section')
let userName = document.querySelector('#userName')

let userArticle = []
let fullName = null

async function geTData() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  const querySnapshot1 = await getDocs(collection(db, "users"));

  querySnapshot1.forEach((doc) => {
    fullName = doc.data().first_name + ' ' + doc.data().last_name
    userName.innerHTML = fullName
  });
  querySnapshot.forEach((doc) => {
    userArticle.push(doc.data())
  });
  renderScreen()
}
geTData()

async function renderScreen() {
  article_section.innerHTML = ''
  userArticle.map((item, index) => {
    // console.log(item);
    article_section.innerHTML += `<div class="card">
  <div class="card-header">
    <div class="d-flex justify-content-between align-items-center">
    <h4 id="userName">${fullName}</h4>
    <h6>${item.createdAt}</h6>
    </div>
  </div>
  <div class="card-body">
    <h2 class="card-title text-center">${item.title}</h2>
    <p class="card-text mt-3 text-center">${item.article}</p>
  </div>
</div>`})
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