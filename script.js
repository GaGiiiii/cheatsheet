let pres = document.querySelectorAll("div.collapse");
// console.log(pres);
let buttons = document.querySelectorAll(".cBTN");
let buttonsClose = document.querySelectorAll(".cBTN-close");
// console.log(buttons);

for (let i = 0; i < pres.length; i++) {
  pres[i].id = "collapseExample" + i;
  buttons[i].dataset.target = "#collapseExample" + i;
  buttonsClose[i].dataset.target = "#collapseExample" + i;
  buttons[i].setAttribute("aria-controls", "collapseExample" + i);
  buttonsClose[i].setAttribute("aria-controls", "collapseExample" + i);
}


let menuLis = [...document.querySelectorAll('#menu a.list-group-item')];
let windowsHash = window.location.hash;
let croppedUrl = windowsHash.substr(1);
let lastActive = menuLis.find(element => element.dataset.menuItem == croppedUrl);
lastActive.classList.add('active');

menuLis.forEach((menuLi) => {
  menuLi.addEventListener('click', (event) => {
    if (lastActive) {
      lastActive.classList.remove('active');
    }
    menuLi.classList.add('active');
    lastActive = menuLi;
  });
});