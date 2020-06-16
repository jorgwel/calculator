var firstNumber = null;
var secondNumber = null;
var operator = null;
var actionTypes = {
    TYPING_DIGIT: 'TYPING_DIGIT',
    SETTING_OPERATION: 'SETTING_OPERATION',
    CALCULATE: 'CALCULATE',
    CLEAR: 'CLEAR'
};

var operators = {PLUS: '+', MINUS: '-', TIMES: '*', DIVISION: '/'};
var ui = new Ui();

function isUserIntroducingFirstNumber() {
    return operator === null && secondNumber === null;
}

function isCalculatorReset() {
    return firstNumber === null && secondNumber === null
        && operator === null;
}

function isDifferentFromZero(value) {
    return !isNaN(value) && Number(value) !== 0;
}

function addTypedDigit(value) {
    var val = extractValue(value);
    if (isUserIntroducingFirstNumber()) {
        firstNumber = getNewNumberValue(firstNumber, val);
        ui.setResult(firstNumber);
    } else {
        secondNumber = getNewNumberValue(secondNumber, val);
        ui.setResult(secondNumber);
    }
}

function performOperation() {
    if (operator === operators.PLUS)
        ui.setResult(sum(firstNumber, secondNumber));
    else if (operator === operators.MINUS)
        ui.setResult(substract(firstNumber, secondNumber));
    else if (operator === operators.TIMES)
        ui.setResult(times(firstNumber, secondNumber));
    else if (operator === operators.DIVISION)
        ui.setResult(div(firstNumber, secondNumber));
}

function act(value, actionType) {
    if (actionType === actionTypes.TYPING_DIGIT) {
        addTypedDigit(value);
    } else if (actionType === actionTypes.SETTING_OPERATION) {
        var result = ui.getResult();
        if (isCalculatorReset() && isDifferentFromZero(result))
            act(Number(result), actionTypes.TYPING_DIGIT);
        operator = value;
    } else if (actionType === actionTypes.CLEAR) {
        resetOperation();
        ui.setResult(0);
    } else if (actionType === actionTypes.CALCULATE) {
        performOperation();
        resetOperation();
    }

}

function sum(firstNum, secondNum) {
    return new Big(toNumber(firstNum)).plus(toNumber(secondNum)).toString();
}

function times(firstNum, secondNum) {
    return new Big(toNumber(firstNum)).times(toNumber(secondNum)).toString();
}

function div(firstNum, secondNum) {
    return new Big(toNumber(firstNum)).div(toNumber(secondNum)).toString();
}

function substract(firstNum, secondNum) {
    return new Big(toNumber(firstNum)).minus(toNumber(secondNum)).toString();
}

function toNumber(str) {
    return Number(str);
}


function extractValue(value) {
    var val = null;
    if (value === '.')
        val = value;
    else
        val = Number(value);
    return val;
}

function getNewNumberValue(currentNumber, newValue) {
    var v = null;
    if (currentNumber === null)
        v = newValue;
    else if (newValue === '.' && String(currentNumber).indexOf(".") >= 0)
        v = String(currentNumber);
    else
        v = String(currentNumber) + String(newValue);
    return v;
}

function setOperation(value) {
    act(value, actionTypes.SETTING_OPERATION);
}

function typeDigit(value) {
    act(value, actionTypes.TYPING_DIGIT);
}

function clear() {
    act('C', actionTypes.CLEAR);
}

function calculate() {
    act('=', actionTypes.CALCULATE);
}

function resetOperation() {
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

$(document).ready(function () {
    ui.setActionsForNumbers(function (val) {
        typeDigit(val)
    });
    ui.setActionsForOperators(function (val) {
        setOperation(val);
    });
    ui.setActionForEquals(function () {
        calculate();
    });
    ui.setActionForClear(function () {
        clear();
    });
    ui.setActionForDotButton(function () {
        typeDigit(".");
    });
});
