import {
  addClassToElement,
  removeClassToElement,
} from "./modules/interface.js";

let aboutUsOne = document.querySelector("#aboutImageOne");
let aboutUsTwo = document.querySelector("#aboutImageTwo");
let aboutUsThree = document.querySelector("#aboutImageThree");
let aboutUsFour = document.querySelector("#aboutImageFour");
let aboutUsOneDark = document.querySelector("#aboutImageOneDark");
let aboutUsTwoDark = document.querySelector("#aboutImageTwoDark");
let aboutUsThreeDark = document.querySelector("#aboutImageThreeDark");
let aboutUsFourDark = document.querySelector("#aboutImageFourDark");
let darkModeBtn = document.querySelector("#darkMode");
let header = document.querySelector("#header");

darkModeBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (darkModeBtn.innerText === "Darkmode") {
    document.body.classList.add("darkMode");
    addClassToElement([header], "darkHeader");
    addClassToElement(
      [aboutUsOne, aboutUsTwo, aboutUsThree, aboutUsFour],
      "hide"
    );
    removeClassToElement(
      [aboutUsOneDark, aboutUsTwoDark, aboutUsThreeDark, aboutUsFourDark],
      "hide"
    );
    darkModeBtn.innerText = "Lightmode";
  } else {
    document.body.classList.remove("darkMode");
    addClassToElement(
      [aboutUsOneDark, aboutUsTwoDark, aboutUsThreeDark, aboutUsFourDark],
      "hide"
    );
    removeClassToElement(
      [aboutUsOne, aboutUsTwo, aboutUsThree, aboutUsFour],
      "hide"
    );
    darkModeBtn.innerText = "Darkmode";
  }
});
