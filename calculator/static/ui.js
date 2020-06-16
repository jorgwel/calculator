
function Ui() {
}

Ui.prototype.getResult = function() {
    return $("#results_panel").html();
};

Ui.prototype.setResult = function(value) {
    return $("#results_panel").html(value);
};

Ui.prototype.addOnNumberClickedListener = function(buttonId, value, fn) {
    $("#" + buttonId).click(function () {
        fn(value);
    });
};

Ui.prototype.addOnOperationClickedListener = function(operatorId, value, fn) {
    $("#" + operatorId).click(function () {
        fn(value);
    });
}

Ui.prototype.setActionForEquals = function(fn) {
    $("#equals_button").click(fn);
}

Ui.prototype.setActionForClear = function(fn) {
    $("#clear_button").click(fn);
}

Ui.prototype.setActionForDotButton = function(fn) {
    $("#dot_button").click(fn);
}

Ui.prototype.setActionsForNumbers = function(fn) {
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
        ui.addOnNumberClickedListener(numbersMap[i].key, numbersMap[i].value, fn);
    }
}

Ui.prototype.setActionsForOperators = function(fn) {
    var operatorsMap = [
        {key: 'plus_button', value: operators.PLUS},
        {key: 'minus_button', value: operators.MINUS},
        {key: 'multiplication_button', value: operators.TIMES},
        {key: 'division_button', value: operators.DIVISION}
    ];
    for (i = 0; i < operatorsMap.length; i++) {
        ui.addOnOperationClickedListener(operatorsMap[i].key, operatorsMap[i].value, fn);
    }
}