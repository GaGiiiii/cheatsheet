function initCollapse() {
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
}

function initSidebar() {
    let menuLis = [...document.querySelectorAll('#menu a.list-group-item')];
    let windowsHash = window.location.hash;
    let croppedUrl = windowsHash.substring(1);
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
}

function initCopyBtns() {
    let copyBtns = document.querySelectorAll('.copy-btn');
    let pres = document.querySelectorAll('pre');

    copyBtns.forEach((copyBtn, index) => {
        copyBtn.addEventListener('click', () => {
            let copyText = pres[index].textContent;
            let textArea = document.createElement('textarea');
            let title = copyBtn.dataset.title;
            console.log(resourceNameInput.value)

            if (resourceNameInput.value !== '') {
                switch (title) {
                    case "dto":
                    case "service":
                    case "controller":
                    case "request":
                    case "factory":
                        textArea.textContent = copyText.replaceAll('User', resourceNameInput.value)
                            .replaceAll('user', camelize(resourceNameInput.value))
                            .replaceAll('Users', resourceNameInput.value + 's')
                            .replaceAll('users',  camelize(resourceNameInput.value) + 's');
                        break;
                    case "feature-wtemplate":
                        textArea.textContent = copyText.replaceAll('MarketingTemplate', resourceNameInput.value)
                            .replaceAll('marketingTemplates', camelize(resourceNameInput.value))
                            .replaceAll('marketingTemplate',  camelize(resourceNameInput.value) + 's')
                            .replaceAll('marketing_template', convertPascalToSnake(resourceNameInput.value))
                            .replaceAll('Template', resourceNameInput.value);
                        break;
                    case "feature-campaign":
                        textArea.textContent = copyText.replaceAll('Campaign', resourceNameInput.value)
                            .replaceAll('campaign',  camelize(resourceNameInput.value))
                            .replaceAll('_campaign', "_" + convertPascalToSnake(resourceNameInput.value))
                            .replaceAll('campaigns',  camelize(resourceNameInput.value) + 's');
                        break;
                    default:
                        textArea.textContent = copyText;
                }
            } else {
                textArea.textContent = copyText;
            }

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
    });
}

let resourceNameInput = document.getElementById('resource-name');

function initGenerateCommands() {
    let laravelGenerateTerminalCommandsForm = document.getElementById('laravel-generate-terminal-commands-form');
    let generateCommandsBtn = document.getElementById('generate-commands-btn');
    let laravelCheckBoxes = document.querySelectorAll('#laravel-generate-terminal-commands-form input[type=checkbox]');
    let projectLocationDiv = document.getElementById('project-location-div');
    let projectLocationInput = document.getElementById('project-location-input');
    let laravelCheckboxAll = document.getElementById('laravel-checkbox-all');
    let numberOfChecked = 0;

    laravelCheckBoxes.forEach(laravelCheckBox => {
        laravelCheckBox.addEventListener('change', (e) => {
            if (laravelCheckBox.value === 'all') {
                if (laravelCheckBox.checked) {
                    laravelCheckBoxes.forEach(laravelCheckBox => {
                        laravelCheckBox.checked = true;
                    });
                } else {
                    laravelCheckBoxes.forEach(laravelCheckBox => {
                        laravelCheckBox.checked = false;
                    });
                }

                numberOfChecked = 1; // Because next if will increment it to 2 or decrease to 0
            }

            if (!laravelCheckBox.checked) {
                laravelCheckboxAll.checked = false;
            }

            if (laravelCheckBox.value === 'service' || laravelCheckBox.value === 'dto' || laravelCheckBox.value === 'all') {
                if (laravelCheckBox.checked) {
                    projectLocationDiv.classList.remove('d-none');
                    projectLocationDiv.classList.add('d-block');
                    numberOfChecked++; // Hey I am the next if that will increment it to 2 :)
                } else {
                    numberOfChecked--; // Hey I am the next if that will decrease it to 0 :)
                    if (numberOfChecked < 1) {
                        projectLocationDiv.classList.add('d-none');
                        projectLocationDiv.classList.remove('d-block');
                    }
                }
            }

            console.log(numberOfChecked)
        });
    });

    laravelGenerateTerminalCommandsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let resourceName = resourceNameInput.value;
        let text = '';

        if (laravelCheckboxAll.checked) {
            //         text += `php artisan make:migration create_${resourceName.toLowerCase()}s_table\\\n\
            // && mkdir ${projectLocationInput.value}/app/Data/${resourceName}\\\n\
            // && touch ${projectLocationInput.value}/app/Data/${resourceName}/${resourceName}Data.php\\\n\
            // && mkdir ${projectLocationInput.value}/app/Services/${resourceName}\\\n\
            // && touch ${projectLocationInput.value}/app/Services/${resourceName}/${resourceName}Service.php\\\n\
            // && php artisan make:controller ${resourceName}/${resourceName}Controller --api\\\n\
            // && php artisan make:request ${resourceName}/Create${resourceName}Request\\\n\
            // && php artisan make:request ${resourceName}/Update${resourceName}Request\\\n\
            // && php artisan make:request ${resourceName}/Delete${resourceName}Request\\\n\
            // && php artisan make:request ${resourceName}/Get${resourceName}Request\\\n\
            // && php artisan make:request ${resourceName}/GetAll${resourceName}sRequest\\\n\
            // && php artisan make:factory ${resourceName}/${resourceName}Factory\\\n\
            // && php artisan make:test ${resourceName}/${resourceName}Test\\\n\
            // && php artisan make:test ${resourceName}/${resourceName}Test --unit`;
            text += `php artisan make:migration create_${resourceName.toLowerCase()}s_table\
&& php artisan make:model ${resourceName}\
&& php artisan make:resource ${resourceName}/${resourceName}Resource\
&& mkdir ${projectLocationInput.value}/app/Data/${resourceName}\
&& touch ${projectLocationInput.value}/app/Data/${resourceName}/${resourceName}Data.php\
&& mkdir ${projectLocationInput.value}/app/Services/${resourceName}\
&& touch ${projectLocationInput.value}/app/Services/${resourceName}/${resourceName}Service.php\
&& php artisan make:controller ${resourceName}/${resourceName}Controller --api\
&& php artisan make:request ${resourceName}/Create${resourceName}Request\
&& php artisan make:request ${resourceName}/Update${resourceName}Request\
&& php artisan make:request ${resourceName}/Delete${resourceName}Request\
&& php artisan make:request ${resourceName}/Get${resourceName}Request\
&& php artisan make:request ${resourceName}/GetAll${resourceName}sRequest\
&& php artisan make:factory ${resourceName}/${resourceName}Factory\
&& php artisan make:test ${resourceName}/${resourceName}Test\
&& php artisan make:test ${resourceName}/${resourceName}Test --unit`;
        } else {
            laravelCheckBoxes.forEach(laravelCheckBox => {
                if (laravelCheckBox.checked) {
                    switch (laravelCheckBox.value) {
                        case 'migration':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:migration create_${resourceName.toLowerCase()}s_table`;

                            break;
                        case 'model':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:model ${resourceName}`;

                            break;
                        case 'dto':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `mkdir ${projectLocationInput.value}/app/Data/${resourceName}`;
                            text += ` && touch ${projectLocationInput.value}/app/Data/${resourceName}/${resourceName}Data.php`;

                            break;
                        case 'service':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `mkdir ${projectLocationInput.value}/app/Services/${resourceName}`;
                            text += ` && touch ${projectLocationInput.value}/app/Services/${resourceName}/${resourceName}Service.php`;

                            break;
                        case 'controller':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:controller ${resourceName}/${resourceName}Controller --api`;

                            break;
                        case 'resource':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:resource ${resourceName}/${resourceName}Resource`;

                            break;
                        case 'requests':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:request ${resourceName}/Create${resourceName}Request && \
php artisan make:request ${resourceName}/Update${resourceName}Request && \
php artisan make:request ${resourceName}/Delete${resourceName}Request && \
php artisan make:request ${resourceName}/Get${resourceName}Request && \
php artisan make:request ${resourceName}/GetAll${resourceName}sRequest`;

                            break;
                        case 'factory':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:factory ${resourceName}/${resourceName}Factory`;

                            break;
                        case 'feature':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:test ${resourceName}/${resourceName}Test`;

                            break;
                        case 'unit':
                            if (text.length > 0) {
                                text += ' && ';
                            }
                            text += `php artisan make:test ${resourceName}/${resourceName}Test --unit`;

                            break;
                    }
                }
            });
        }

        console.log(text)

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(text);
        generateCommandsBtn.innerHTML = "Copied";
        setInterval(() => {
            generateCommandsBtn.innerHTML = "Generate commands";
        }, 1000);
    });
}

function convertPascalToSnake(s) {
    return s.replace(/(?:^|\.?)([A-Z])/g, function (x, y) { return "_" + y.toLowerCase() }).replace(/^_/, "");
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

initCollapse();
initSidebar();
initCopyBtns();
initGenerateCommands();