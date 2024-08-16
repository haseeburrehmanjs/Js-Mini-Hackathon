import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


import { auth, db } from "../config.js";

let form = document.querySelector('#form')
let first_name = document.querySelector('#first_name')
let last_name = document.querySelector('#last_name')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let repeat_password = document.querySelector('#repeat_password')

form.addEventListener('submit', async event => {
    event.preventDefault()

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            window.location = './login.html'
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        });

    try {
        const docRef = await addDoc(collection(db, "users"), {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            createdAt : new Date()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

})