import {
  closeHamburgerMenuInHamburgerMenu,
  addClassToElement,
  removeClassToElement,
} from "./modules/interface.js";

import {
  loginChecker,
  register,
  postMessage,
  getMessages,
  deleteAllMessages,
} from "./modules/fetch.js";

const messageFieldDiv = document.querySelector("#messageFieldDiv");
const loginForm = document.querySelector("#logInForm");
const registerForm = document.querySelector("#registerForm");
const loginSwitch = document.querySelector("#switchToLogIn");
const registerSwitch = document.querySelector("#switchToRegister");
const logIn = document.querySelector("#logIn");
const createAccount = document.querySelector("#createAccount");
const mainPage = document.querySelector("#main");
const navBar = document.querySelector("#nav");
const frontPage = document.querySelector("#frontPage");
const webName = document.querySelector("#webName");
const homePage = document.querySelector("#home");
const messageboardPage = document.querySelector("#messageboard");
const contactPage = document.querySelector("#contact");
const aboutUsPage = document.querySelector("#aboutUs");
const closeIcon = document.querySelector("#closeIcon");
const menuIcon = document.querySelector("#menuIcon");
const menu = document.querySelector(".menu");
const contactForm = document.querySelector("#contactForm");
const footer = document.querySelector("#footer");
const secretForm = document.querySelector("#secretForm");

// Byter mellan log in och register pages
registerSwitch.addEventListener("click", registerSwitcher);
loginSwitch.addEventListener("click", loginSwitcher);
function registerSwitcher(event) {
  event.preventDefault();
  addClassToElement([footer], "footerPosition");
  addClassToElement([logIn, loginForm], "hide");
  removeClassToElement([createAccount, registerForm], "hide");
}
function loginSwitcher(event) {
  event.preventDefault();
  addClassToElement([createAccount, registerForm], "hide");
  removeClassToElement([logIn, loginForm], "hide");
  removeClassToElement([footer], "footerPosition");
}

// Submit för login och register form
loginForm.addEventListener("submit", loginHandler);
function loginHandler(event) {
  event.preventDefault();
  loginChecker();
  loginForm.reset();
}

registerForm.addEventListener("submit", registerHandler);
function registerHandler(event) {
  const password = document.querySelector("#registerPassword").value;
  const confirmPassword = document.querySelector(
    "#confirmRegisterPassword"
  ).value;
  event.preventDefault();
  if (confirmPassword !== password) return alert("Password is not the same!");

  registerSwitcher(event);
  const username = document
    .querySelector("#registerUsername")
    .value.toLowerCase();

  register(username, password);

  addClassToElement([webName], "hideMobile");
  addClassToElement([frontPage], "hide");
  removeClassToElement([mainPage, navBar], "hide");
  removeClassToElement([footer], "footerPosition");

  registerForm.reset();
}
// Funktionaliteten åt navbar länkarna
document.querySelectorAll("#nav a").forEach((menuLink) => {
  menuLink.addEventListener("click", (event) => {
    event.preventDefault();

    addClassToElement(
      [homePage, messageboardPage, aboutUsPage, contactPage],
      "hide"
    );

    switch (event.currentTarget.id) {
      case "homeNav":
        removeClassToElement([homePage], "hide");
        removeClassToElement([footer], "footerPosition");
        closeHamburgerMenuInHamburgerMenu();
        break;
      case "messageboardNav":
        addClassToElement([footer], "footerPosition");
        removeClassToElement([messageboardPage], "hide");
        closeHamburgerMenuInHamburgerMenu();
        getMessages().then(displayMessage);
        break;
      case "aboutUsNav":
        addClassToElement([footer], "footerPosition");
        removeClassToElement([aboutUsPage], "hide");
        closeHamburgerMenuInHamburgerMenu();
        break;
      case "contactNav":
        removeClassToElement([contactPage], "hide");
        removeClassToElement([footer], "footerPosition");
        closeHamburgerMenuInHamburgerMenu();
        break;
      case "logoutNav":
        addClassToElement(
          [mainPage, registerForm, createAccount, navBar],
          "hide"
        );

        removeClassToElement([homePage, frontPage, loginForm, logIn], "hide");
        removeClassToElement([webName], "hideMobile");
        removeClassToElement([footer], "footerPosition");
        closeHamburgerMenuInHamburgerMenu();
        deleteAllMessages();
        break;
    }
  });
});

// Anne-lie: Here is code for mute button
const muteBtn = document.querySelector("#muteBtn");
let isSoundMuted = false;

muteBtn.addEventListener("click", () => {
  isSoundMuted = !isSoundMuted;
  muteBtn.innerHTML = isSoundMuted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
});
// Anne-lie: mute button ends

//Send message
document
  .querySelector("#sendMessageButton")
  .addEventListener("click", (event) => {
    event.preventDefault();
    messageFieldDiv.innerHTML = "";
    let messageInput = document.querySelector("#secretMessageInput").value;

    const coolSound = new Audio("./sounds/snare-112754.mp3");
    // Anne-lie:mute button
    if (!isSoundMuted) {
      coolSound.play();
    }
    // Anne-lie: mute button

    // Ton grupp 3 feature start//
    postMessage(messageInput).then(getMessages).then(displayMessage);
    // Ton grupp 3 feature end//
    secretForm.reset();
  });

// Ton grupp 3 feature start//
function displayMessage(message) {
  console.log(message);
  messageFieldDiv.innerHTML = "";
  for (const key in message) {
    console.log(message[key].text);

    // Angelica 13:37 elit spy
    const date = new Date(message[key].time);
    const time = `${date.getHours()}:${date.getMinutes()}`;
    let messageDiv = document.createElement("div");
    let messagePara = (document.createElement("p").innerText =
      message[key].text);
    let messageUserName = (document.createElement("p").innerText =
      time === "13:37" ? "Elite Spy" : "Spy");

    addClassToElement([messageDiv], "message");
    messageDiv.append(messagePara);
    messageFieldDiv.append(messageUserName, messageDiv);
    messageFieldDiv.scrollTop = messageFieldDiv.scrollHeight;
  }
}
// Ton grupp 3 feature end//

// Hamburgermenu
document.querySelector(".hamburgerMenu").addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.id == "menuIcon") {
    addClassToElement([menu], "showMenu");
    addClassToElement([menuIcon], "hide");
    removeClassToElement([closeIcon], "hide");
  } else if (event.target.id == "closeIcon") {
    addClassToElement([closeIcon], "hide");
    removeClassToElement([menuIcon], "hide");
    removeClassToElement([menu], "showMenu");
  }
});

// Contact funktion
// document.querySelector("#contactButton").addEventListener("click", (event) => {
//   event.preventDefault();
//   contactForm.reset();
// });

// Kamy grupp 4 contact form feature //

document.querySelector("#contactButton").addEventListener("click", (event) => {
  event.preventDefault();
  let dialog = document.querySelector("#popupWrapper");
  dialog.showModal();
  dialog.style.display = "flex";
  document.querySelector("#popupOly").style.display = "block";
});

document.querySelector("#closeBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let dialog = document.querySelector("#popupWrapper");
  dialog.close();
  dialog.style.display = "none";
  let popUpBack = document.querySelector("#popupOly");
  popUpBack.style.display = "none";
  contactForm.reset();
});
