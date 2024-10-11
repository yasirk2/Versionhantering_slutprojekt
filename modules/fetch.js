/*Tests for fetch*/
import { addClassToElement } from "./interface.js";
import { removeClassToElement } from "./interface.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  push,
  onChildAdded,
  onChildRemoved,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const mainPage = document.querySelector("#main");
const navBar = document.querySelector("#nav");
const frontPage = document.querySelector("#frontPage");
const webName = document.querySelector("#webName");

const firebaseConfig = {
  apiKey: "AIzaSyCf1AUREbV5BzyIb7_5nrj4fjFxcFL8jM8",

  authDomain: "spychat-a5f8e.firebaseapp.com",

  databaseURL:
    "https://spychat-a5f8e-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "spychat-a5f8e",

  storageBucket: "spychat-a5f8e.appspot.com",

  messagingSenderId: "644385877729",

  appId: "1:644385877729:web:eeab1dc8e5763371a511a0",
};

let userId;

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const USERS_URL =
  "https://spychat-a5f8e-default-rtdb.europe-west1.firebasedatabase.app/users/.json";

////////////////////////////////////////////////////////
////////////////////////GET DATA/ checka vad som finns inuti BASE_URL\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////
export async function loginChecker() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  let response = await fetch(USERS_URL);
  let data = await response.json();
  let isLoggedIn = false;

  for (userId in data) {
    let userName = data[userId].username;
    let userPass = data[userId].password;
    console.log("LOGIN; ", userId, userName, userPass);

    if (username === userName && password === userPass) {
      isLoggedIn = true;
    }
  }

  if (isLoggedIn) {
    addClassToElement([webName], "hideMobile");
    addClassToElement([frontPage], "hide");
    removeClassToElement([mainPage, navBar], "hide");
  } else {
    alert("Wrong username or password");
  }
}
const MESSAGES_URL = `https://spychat-a5f8e-default-rtdb.europe-west1.firebasedatabase.app/messages.json`;

////////////////////////////////////////////////////////
////////////////////////registrera\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////
export async function register(username, password) {
  let loginInfo = { username, password };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginInfo),
  };

  let response = await fetch(USERS_URL, requestOptions);
  let data = await response.json();
  console.log(data);
}

////////////////////////////////////////////////////////
////////////////////////Post message\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////
export async function postMessage() {
  let message = document.querySelector("#secretMessageInput").value;
  let messageObject = { text: message, time: new Date() };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageObject),
  };

  let response = await fetch(MESSAGES_URL, requestOptions);
  let data = await response.json();
  console.log(data);
}

////////////////////////////////////////////////////////
////////////////////////Get message\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////
export async function getMessages() {
  let response = await fetch(MESSAGES_URL);
  let data = await response.json();
  console.log(data);
  return data;
}
export async function deleteAllMessages() {
  const requestOptions = {
    method: "DELETE",
  };
  let response = await fetch(MESSAGES_URL, requestOptions);
  let data = await response.json();
  console.log(data);
}
