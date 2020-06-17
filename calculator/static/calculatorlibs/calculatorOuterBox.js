function CalculatorOuterBox() {
}

CalculatorOuterBox.prototype.getValueInDisplay = function () {
    return this.getResult();
}
CalculatorOuterBox.prototype.display = function ( value ) {
    return this.setResult( value );
}

CalculatorOuterBox.prototype.getResult = function () {
    return $( "#results_panel" ).html();
};

CalculatorOuterBox.prototype.setResult = function ( value ) {
    this.setError( '' );
    return $( "#results_panel" ).html( value );
};

CalculatorOuterBox.prototype.setError = function ( value ) {
    $( "#error_panel" ).html( value );
};

CalculatorOuterBox.prototype.addOnNumberClickedListener = function ( buttonId, value, fn ) {
    $( "#" + buttonId ).click( function () {
        fn( value );
    } );
};

CalculatorOuterBox.prototype.addOnOperationClickedListener = function ( operatorId, value, fn ) {
    $( "#" + operatorId ).click( function () {
        fn( value );
    } );
}

CalculatorOuterBox.prototype.setActionForEquals = function ( fn ) {
    $( "#equals_button" ).click( fn );
}

CalculatorOuterBox.prototype.setActionForClear = function ( fn ) {
    $( "#clear_button" ).click( fn );
}

CalculatorOuterBox.prototype.setActionForDotButton = function ( fn ) {
    $( "#dot_button" ).click( fn );
}

CalculatorOuterBox.prototype.setActionForDeleteButton = function ( fn ) {
    $( "#delete_button" ).click( fn );
}

CalculatorOuterBox.prototype.setActionsForNumbers = function ( fn ) {
    var numbersMap = [
        { key: 'zero_button', value: 0 },
        { key: 'one_button', value: 1 },
        { key: 'two_button', value: 2 },
        { key: 'three_button', value: 3 },
        { key: 'four_button', value: 4 },
        { key: 'five_button', value: 5 },
        { key: 'six_button', value: 6 },
        { key: 'seven_button', value: 7 },
        { key: 'eight_button', value: 8 },
        { key: 'nine_button', value: 9 }
    ];
    for ( i = 0; i < numbersMap.length; i++ ) {
        this.addOnNumberClickedListener( numbersMap[ i ].key, numbersMap[ i ].value, fn );
    }
}

CalculatorOuterBox.prototype.setActionsForOperators = function ( fn ) {
    var operatorsMap = [
        { key: 'plus_button', value: operators.PLUS },
        { key: 'minus_button', value: operators.MINUS },
        { key: 'multiplication_button', value: operators.TIMES },
        { key: 'division_button', value: operators.DIVISION }
    ];
    for ( i = 0; i < operatorsMap.length; i++ ) {
        this.addOnOperationClickedListener( operatorsMap[ i ].key, operatorsMap[ i ].value, fn );
    }
}