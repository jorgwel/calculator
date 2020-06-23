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

CalculatorOuterBox.prototype.addLog = function ( value ) {
    var li = $("<li>", {"class": "printed_item"});
    li.html(value);
    $("#history_items").append(li);
    showBottomOfPrinterLog();
};

CalculatorOuterBox.prototype.addErrorLog = function ( value ) {
    var li = $("<li>", {"class": "printed_item error"});
    li.html(value);
    $("#history_items").append(li);
};

CalculatorOuterBox.prototype.clearLog = function () {
    $("#history_items").html("");
    this.addLog("No operation in log");
};

CalculatorOuterBox.prototype.addKeyListenerToBody = function ( keyboardValues, id ) {
    $( "body" ).keypress( function ( event ) {
        if ( keyboardValues.includes( event.which, 0 ) ) {
            event.preventDefault();
            $( id ).click()
        }
    } );
}

CalculatorOuterBox.prototype.addKeyListenerToBodyForKeyDown = function ( keyboardValues, id ) {
    $( "body" ).keydown( function ( event ) {
        if ( keyboardValues.includes( event.which, 0 ) ) {
            event.preventDefault();
            $( id ).click()
        }
    } );
}

CalculatorOuterBox.prototype.addOnNumberClickedListener = function ( buttonId, value, keyboardValues, fn ) {
    var id = "#" + buttonId;
    $( id ).click( function () {
        fn( value );
    } );
    this.addKeyListenerToBody( keyboardValues, id );
};

CalculatorOuterBox.prototype.addOnOperationClickedListener = function ( operatorId, value, keyboardValues, fn ) {
    var id = "#" + operatorId;
    $( id ).click( function () {
        fn( value );
    } );
    this.addKeyListenerToBody( keyboardValues, id );
}

CalculatorOuterBox.prototype.setActionForEquals = function ( fn ) {
    var id = "#equals_button";
    $( id ).click( fn );
    this.addKeyListenerToBody( [ 61, 13 ], id );
}

CalculatorOuterBox.prototype.setActionForClear = function ( fn ) {
    var id = "#clear_button";
    $( id ).click( fn );
    this.addKeyListenerToBody( [ 99, 67 ], id );
}

CalculatorOuterBox.prototype.setActionForDotButton = function ( fn ) {
    var id = "#dot_button";
    $( id ).click( fn );
    this.addKeyListenerToBody( [ 46 ], id );
}

CalculatorOuterBox.prototype.setActionForDeleteButton = function ( fn ) {
    var id = "#delete_button";
    $( id ).click( fn );
    this.addKeyListenerToBodyForKeyDown( [ 8 ], id );
}

CalculatorOuterBox.prototype.setActionsForNumbers = function ( fn ) {
    var numbersMap = [
        { key: 'zero_button', keyboardValues: [ 48 ], value: 0 },
        { key: 'one_button', keyboardValues: [ 49 ], value: 1 },
        { key: 'two_button', keyboardValues: [ 50 ], value: 2 },
        { key: 'three_button', keyboardValues: [ 51 ], value: 3 },
        { key: 'four_button', keyboardValues: [ 52 ], value: 4 },
        { key: 'five_button', keyboardValues: [ 53 ], value: 5 },
        { key: 'six_button', keyboardValues: [ 54 ], value: 6 },
        { key: 'seven_button', keyboardValues: [ 55 ], value: 7 },
        { key: 'eight_button', keyboardValues: [ 56 ], value: 8 },
        { key: 'nine_button', keyboardValues: [ 57 ], value: 9 }
    ];
    for ( i = 0; i < numbersMap.length; i++ ) {
        this.addOnNumberClickedListener( numbersMap[ i ].key, numbersMap[ i ].value, numbersMap[ i ].keyboardValues, fn );
    }
}

CalculatorOuterBox.prototype.setActionsForOperators = function ( fn ) {
    var operatorsMap = [
        { key: 'plus_button', keyboardValues: [ 43 ], value: operators.PLUS },
        { key: 'minus_button', keyboardValues: [ 45 ], value: operators.MINUS },
        { key: 'multiplication_button', keyboardValues: [ 120, 88, 42 ], value: operators.TIMES },
        { key: 'division_button', keyboardValues: [ 47 ], value: operators.DIVISION }
    ];
    for ( i = 0; i < operatorsMap.length; i++ ) {
        this.addOnOperationClickedListener( operatorsMap[ i ].key, operatorsMap[ i ].value, operatorsMap[ i ].keyboardValues, fn );
    }
}

function showBottomOfPrinterLog() {
    var out = document.getElementById( "history_items" );
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    if ( !isScrolledToBottom )
        out.scrollTop = out.scrollHeight - out.clientHeight;
}