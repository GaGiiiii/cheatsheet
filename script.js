let containerDivsForPres = document.querySelectorAll("div.custom-collapse-class");
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
        textArea.setSelectionRange(0, 999999);
        navigator.clipboard.writeText(textArea.value);
        // Delete created textarea
        textArea.parentNode.removeChild(textArea);
        // Change btn text and revert it back after 1 sec
        copyBtn.innerHTML = "Copied";
        setInterval(() => {
            copyBtn.innerHTML = "Copy";
        }, 1000);
    });
})

let laravelGenerateTerminalCommandsForm = document.getElementById('laravel-generate-terminal-commands-form');
let resourceNameInput = document.getElementById('resource-name');
let generateCommandsBtn = document.getElementById('generate-commands-btn');

laravelGenerateTerminalCommandsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let resourceName = resourceNameInput.value;
    console.log(resourceName)
    let text = `php artisan create_${resourceName.toLowerCase()}s_table && \
php artisan make:controller ${resourceName}/${resourceName}Controller --api && \
php artisan make:model ${resourceName} && \
php artisan make:request ${resourceName}/Create${resourceName}Request && \
php artisan make:request ${resourceName}/Update${resourceName}Request && \
php artisan make:request ${resourceName}/Delete${resourceName}Request && \
php artisan make:request ${resourceName}/Get${resourceName}Request && \
php artisan make:request ${resourceName}/GetAll${resourceName}sRequest`;

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(text);
    generateCommandsBtn.innerHTML = "Copied";
    setInterval(() => {
        generateCommandsBtn.innerHTML = "Generate commands";
    }, 1000);
});