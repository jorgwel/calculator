var firstNumber = null;
var secondNumber = null;
var operator = null;
var actionTypes = { 
    TYPING_DIGIT: 'TYPING_DIGIT',
    SETTING_OPERATION: 'SETTING_OPERATION',
    CALCULATE: 'CALCULATE',
    CLEAR: 'CLEAR'
};
var operators = { PLUS :'+', MINUS :'-', TIMES :'*', DIVISION : '/' };

function setResult(value){
    $("#results_panel").html(value);
}

function getResult(){
    return $("#results_panel").html();
}

function act(value, actionType) {
    if (actionType === actionTypes.TYPING_DIGIT) {
        var val = extractValue(value);
        if (operator === null && secondNumber === null) {
            firstNumber = getNewNumberValue(firstNumber, val);
            setResult(firstNumber);
        } else {
            secondNumber = getNewNumberValue(secondNumber, val);
            setResult(secondNumber);
        }

    } else if (actionType === actionTypes.SETTING_OPERATION) {
        var currentResult = getResult();
        if (firstNumber === null && secondNumber === null
            && operator === null && !isNaN(currentResult) && Number(currentResult) !== 0) {
            act(Number(currentResult), actionTypes.TYPING_DIGIT);
        }
        operator = value;
    } else if (actionType === actionTypes.CLEAR) {
        resetOperation();
        setResult(0);
    } else if (actionType === actionTypes.CALCULATE) {
        if (operator === operators.PLUS)
            setResult(sum(firstNumber, secondNumber));
        else if (operator === operators.MINUS)
            setResult(substract(firstNumber, secondNumber));
        else if (operator === operators.TIMES)
            setResult(times(firstNumber, secondNumber));
        else if (operator === operators.DIVISION)
            setResult(div(firstNumber, secondNumber));

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

function getNewNumberValue(currentNumber, newValue){
    var v = null;
    if (currentNumber === null)
        v = newValue;
    else if (newValue === '.' && String(currentNumber).indexOf(".") >= 0)
        v = String(currentNumber);
    else
        v = String(currentNumber) + String(newValue);
    return v;
}

function addOnNumberClickedListener(buttonId, value){
    $("#" + buttonId).click(function() {
        act(value, actionTypes.TYPING_DIGIT);
    });
}

function addOnOperationClickedListener(operatorId, value) {
    $("#" + operatorId).click(function() {
        act(value, actionTypes.SETTING_OPERATION);
    });
}

function setActionsForNumbers() {
    var numbersMap = [
        {key: 'zero_button', value: 0},
        {key: 'one_button', value: 1},
        {key: 'two_button', value: 2},
        {key: 'three_button', value: 3},
        {key: 'four_button', value: 4},
        {key: 'five_button', value: 5},
        {key: 'six_button', value: 6},
        {key: 'seven_button', value: 7},
        {key: 'eight_button', value: 8},
        {key: 'nine_button', value: 9}
    ];
    for (i = 0; i < numbersMap.length; i++) {
        addOnNumberClickedListener(numbersMap[i].key, numbersMap[i].value);
    }
}

function setActionsForOperators() {
    var operatorsMap = [
        {key: 'plus_button', value: operators.PLUS},
        {key: 'minus_button', value: operators.MINUS},
        {key: 'multiplication_button', value: operators.TIMES},
        {key: 'division_button', value: operators.DIVISION}
    ];
    for (i = 0; i < operatorsMap.length; i++) {
        addOnOperationClickedListener(operatorsMap[i].key, operatorsMap[i].value);
    }
}

function setActionForEquals(){
    $("#equals_button").click(function() {
        calculate();
    });
}

function setActionForClear(){
    $("#clear_button").click(function() {
        clear();
    });
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

function setActionForDotButton() {
    $("#dot_button").click(function() {
        act(".", actionTypes.TYPING_DIGIT);
    });
}

$(document).ready(function() {
    setActionsForNumbers();
    setActionsForOperators();
    setActionForEquals();
    setActionForClear();
    setActionForDotButton();
});

