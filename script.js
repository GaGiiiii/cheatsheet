let pres = document.querySelectorAll("pre.collapse");
console.log(pres);
let buttons = document.querySelectorAll(".cBTN");
console.log(buttons);

for(let i = 0; i < pres.length; i++){
  pres[i].id = "collapseExample" + i;
  buttons[i].dataset.target = "#collapseExample" + i;
  buttons[i].setAttribute("aria-controls", "collapseExample" + i);
}