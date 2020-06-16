var actionTypes = {
    TYPING_DIGIT: 'TYPING_DIGIT',
    SETTING_OPERATION: 'SETTING_OPERATION',
    CALCULATE: 'CALCULATE',
    CLEAR: 'CLEAR'
};

var operators = { PLUS: '+', MINUS: '-', TIMES: '*', DIVISION: '/' };
var ui = new Ui();
var math = new MathOperations();
var o = new Operation();

function isDifferentFromZero( value ) {
    return Number( value ) !== 0;
}

function addTypedDigit( value ) {
    var val = extractValue( value );
    if ( o.getCurrentState() === operationState.CAPTURING_FIRST_NUMBER ) {
        o.firstNumber = getNewNumberValue( o.firstNumber, val );
        ui.setResult( o.firstNumber );
    } else {
        o.secondNumber = getNewNumberValue( o.secondNumber, val );
        ui.setResult( o.secondNumber );
    }
}

function performOperation( op ) {
    let oper = op.operator;
    let first = op.firstNumber;
    let second = op.secondNumber;
    if ( oper === operators.PLUS )
        ui.setResult( math.sum( first, second ) );
    else if ( oper === operators.MINUS )
        ui.setResult( math.substract( first, second ) );
    else if ( oper === operators.TIMES )
        ui.setResult( math.times( first, second ) );
    else if ( oper === operators.DIVISION )
        ui.setResult( math.div( first, second ) );
}

function setResultAsFirstOperatorIfOperationResetAndResultDifferentFromZero() {
    var result = ui.getResult();
    if ( o.isReset() && isDifferentFromZero( result ) )
        act( Number( result ), actionTypes.TYPING_DIGIT );
}

function setOperator( value ) {
    setResultAsFirstOperatorIfOperationResetAndResultDifferentFromZero();
    o.operator = value;
}

function act( value, actionType ) {
    if ( actionType === actionTypes.TYPING_DIGIT ) {
        addTypedDigit( value );
    } else if ( actionType === actionTypes.SETTING_OPERATION ) {
        setOperator( value );
    } else if ( actionType === actionTypes.CLEAR ) {
        o.resetOperation();
        ui.setResult( 0 );
    } else if ( actionType === actionTypes.CALCULATE ) {
        performOperation( o );
        o.resetOperation();
    }

}

function extractValue( value ) {
    return value === '.' ? value : Number( value );
}

function containsADot( currentNumber ) {
    return String( currentNumber ).indexOf( "." ) >= 0;
}

function isUserTryingToAddADoubleDot( newValue, currentNumber ) {
    return newValue === '.' && containsADot( currentNumber );
}

function isFirstValueForNumber( currentNumber ) {
    return currentNumber === null;
}

function joinCurrentAndNewValues( currentNumber, newValue ) {
    return String( currentNumber ) + String( newValue );
}

function getNewNumberValue( currentNumber, newValue ) {
    return isFirstValueForNumber( currentNumber ) ? newValue
        : isUserTryingToAddADoubleDot( newValue, currentNumber ) ? String( currentNumber )
            : joinCurrentAndNewValues( currentNumber, newValue );
}

function setOperation( value ) {
    act( value, actionTypes.SETTING_OPERATION );
}

function typeDigit( value ) {
    act( value, actionTypes.TYPING_DIGIT );
}

function clear() {
    act( 'C', actionTypes.CLEAR );
}

function calculate() {
    act( '=', actionTypes.CALCULATE );
}


$( document ).ready( function () {
    ui.setActionsForNumbers( function ( val ) {
        typeDigit( val )
    } );
    ui.setActionsForOperators( function ( val ) {
        setOperation( val );
    } );
    ui.setActionForEquals( function () {
        calculate();
    } );
    ui.setActionForClear( function () {
        clear();
    } );
    ui.setActionForDotButton( function () {
        typeDigit( "." );
    } );
} );
