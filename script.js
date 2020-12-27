let containerDivsForPres = document.querySelectorAll("div.collapse");
// console.log(containerDivsForPres);
let buttons = document.querySelectorAll(".cBTN");
let buttonsClose = document.querySelectorAll(".cBTN-close");
// console.log(buttons);

for (let i = 0; i < containerDivsForPres.length; i++) {
  containerDivsForPres[i].id = "collapseExample" + i;
  buttons[i].dataset.target = "#collapseExample" + i;
  buttonsClose[i].dataset.target = "#collapseExample" + i;
  buttons[i].setAttribute("aria-controls", "collapseExample" + i);
  buttonsClose[i].setAttribute("aria-controls", "collapseExample" + i);
}


let menuLis = [...document.querySelectorAll('#menu a.list-group-item')];
let windowsHash = window.location.hash;
let croppedUrl = windowsHash.substr(1);
let lastActive = menuLis.find(element => element.dataset.menuItem == croppedUrl);
if (lastActive) {
  lastActive.classList.add('active');
}

menuLis.forEach((menuLi) => {
  menuLi.addEventListener('click', (event) => {
    if (lastActive) {
      lastActive.classList.remove('active');
    }
    menuLi.classList.add('active');
    lastActive = menuLi;
  });
});

// COPY BTNS

let copyBtns = document.querySelectorAll('.copy-btn');
let pres = document.querySelectorAll('pre');

copyBtns.forEach((copyBtn, index) => {
  copyBtn.addEventListener('click', () => {
    let copyText = pres[index].textContent;
    let textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    copyBtn.innerHTML = "Copied";
    setInterval(() => {
      copyBtn.innerHTML = "Copy";
    }, 1000);
  });
})

