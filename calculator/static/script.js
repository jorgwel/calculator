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
let cb = new CalculatorOuterBox();
var e = new CalculatorEngine(cb);

function isDifferentFromZero( value ) {
    return Number( value ) !== 0;
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
        e.act( Number( result ), actionTypes.TYPING_DIGIT );
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

function CalculatorOuterBox() {
}

CalculatorOuterBox.prototype.addTypedDigit = function ( value ) {
    var val = extractValue( value );
    if ( o.getCurrentState() === operationState.CAPTURING_FIRST_NUMBER ) {
        o.firstNumber = getNewNumberValue( o.firstNumber, val );
        ui.setResult( o.firstNumber );
    } else {
        o.secondNumber = getNewNumberValue( o.secondNumber, val );
        ui.setResult( o.secondNumber );
    }
}
CalculatorOuterBox.prototype.setOperator = function ( value ) {
    setResultAsFirstOperatorIfOperationResetAndResultDifferentFromZero();
    o.operator = value;
}
CalculatorOuterBox.prototype.clearCalculator = function () {
    o.resetOperation();
    ui.setResult( 0 );
}
CalculatorOuterBox.prototype.calculateAndReset = function () {
    performOperation( o );
    o.resetOperation();
}

$( document ).ready( function () {
    ui.setActionsForNumbers( function ( val ) {
        e.typeDigit( val )
    } );
    ui.setActionsForOperators( function ( val ) {
        e.setOperation( val );
    } );
    ui.setActionForEquals( function () {
        e.calculate();
    } );
    ui.setActionForClear( function () {
        e.clear();
    } );
    ui.setActionForDotButton( function () {
        e.typeDigit( "." );
    } );
} );
