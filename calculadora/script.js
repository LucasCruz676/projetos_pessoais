

function getHistory() {
    return document.getElementById('history-value').innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printoutput(num) {
    if (num === "") {
        document.getElementById("output-value").innerText = num;
    } else {
        var n = Number(num);
        var value = n.toLocaleString("en");
        document.getElementById("output-value").innerText = value;
    }
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id === "clear") {
            printHistory("");
            printoutput("");
        }
        else if (this.id === "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printoutput(output);
            }
        }
        else {
            var output = getOutput();
            var history = getHistory();
            if (output === "" && history !== "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output !== "" || history !== "") {
                output = output === "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id === "=") {
                    var result = eval(history);
                    printoutput(result);
                    printHistory("");
                }

                else if (this.id === "%") {
                    var n = reverseNumberFormat(getOutput());
                    var percent = n / 100;
                    printoutput(percent.toFixed(4));
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printoutput("");
                }
            }
        }
    });
}

var numberButtons = document.getElementsByClassName("number");
for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        // if output is a number
        if (!isNaN(output)) {
            output = output + this.id;
            printoutput(output);
        }
    });
}
const themeButton = document.getElementById('theme-toggle');

themeButton.addEventListener('click', function() {
    if(document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeButton.textContent = '🌞 Claro';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeButton.textContent = '🌙 Escuro';
    }
});


const backspaceButton = document.getElementById('backspace');
const outputValue = document.getElementById('output-value');
const historyValue = document.getElementById('history-value');

backspaceButton.addEventListener('click', function() {
    let output = outputValue.innerText;
    let history = historyValue.innerText;

    if (output) {
        // Apaga o último caractere do output
        output = output.slice(0, -1);
        outputValue.innerText = output;
    } else if (history) {
        // Se output estiver vazio, apaga o último caractere do history
        history = history.slice(0, -1);
        historyValue.innerText = history;
    }
});     
// Mostrar ou esconder o painel de histórico
document.getElementById('menu-icon').addEventListener('click', function() {
    let panel = document.getElementById('history-panel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
});

// Adicionar o histórico quando clica em "="
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id == "=") {
            var output = getOutput();
            var history = getHistory();
            if (output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                var result = eval(history);
                printoutput(result);
                printHistory("");

                // Adicionar no histórico visual
                let historyList = document.getElementById('history-list');
                let listItem = document.createElement('li');
                listItem.textContent = history + ' = ' + result;
                historyList.appendChild(listItem);
            }
        }
    });
}

// Botão de limpar histórico
document.getElementById('clear-history').addEventListener('click', function() {
    document.getElementById('history-list').innerHTML = '';
});



