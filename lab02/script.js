/*
    TODO:
    - сделать накопление результата\множественные операции
*/

window.onload = function () {
    let a = ''; // Первое число
    let b = ''; // Второе число
    let result = ''; // Результат вычисления
    let operation = null; // Текущая операция
    let outputElement = document.getElementById("result");

    function updateDisplay(value) {
        // тут нужно добавить проверку
        outputElement.innerHTML = value;
    }

    function onDigitButtonClicked(digit) {
        if (result && !operation) {
            a = ''; // Если есть результат, сбрасываем его при вводе нового числа
            result = '';
        }

        if (!operation) {
            if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
                a += digit;
            }
            updateDisplay(a);
        } else {
            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit;
            }
            updateDisplay(b);
        }
    }

    function onOperationButtonClicked(op) {
        if (a === '') return;

        if (b !== '') {
            calculateResult(); // Если уже есть `b`, сразу вычисляем перед новой операцией
        }

        operation = op;
        updateDisplay(a + ' ' + op); // Показываем текущую операцию
    }

    function calculateResult() {
        if (a === '' || b === '' || !operation) return;

        let numA = parseFloat(a);
        let numB = parseFloat(b);

        switch (operation) {
            case 'x': result = numA * numB; break;
            case '+': result = numA + numB; break;
            case '-': result = numA - numB; break;
            case '/': result = numB !== 0 ? numA / numB : 'Ошибка'; break;
        }

        a = result.toString(); // Сохраняем результат как `a`
        b = ''; // Сбрасываем `b`
        operation = null; // Готовимся к следующему вводу
        updateDisplay(a);
    }

    document.getElementById("btn_op_equal").onclick = function () {
        calculateResult();
    };

    document.getElementById("btn_op_clear").onclick = function () {
        a = b = result = '';
        operation = null;
        updateDisplay("0");
    };

    document.getElementById("btn_op_del").onclick = function () {
        if (operation) {
            b = b.slice(0, -1);
            updateDisplay(b || "0");
        } else {
            a = a.slice(0, -1);
            updateDisplay(a || "0");
        }
    };

    document.getElementById("btn_op_zeros").onclick = function () {
        if (operation) {
            b += '000';
            updateDisplay(b);
        } else {
            a += '000';
            updateDisplay(a);
        }
    };

    document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
        button.onclick = function () {
            //
            onDigitButtonClicked(this.innerHTML);
        };
    });

    document.getElementById("btn_op_mult").onclick = function () { onOperationButtonClicked("x"); };
    document.getElementById("btn_op_plus").onclick = function () { onOperationButtonClicked("+"); };
    document.getElementById("btn_op_minus").onclick = function () { onOperationButtonClicked("-"); };
    document.getElementById("btn_op_div").onclick = function () { onOperationButtonClicked("/"); };

    updateDisplay("0");
};
