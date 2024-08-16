import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../config.js";

let email = document.querySelector('#email')
let password = document.querySelector('#password')
let form = document.querySelector('#form')

form.addEventListener('submit', event => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    window.location = './dashbord.html'
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
  });

})