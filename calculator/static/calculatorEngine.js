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

function extractValue( value ) {
    return value === '.' ? value : Number( value );
}

function isDifferentFromZero( value ) {
    return Number( value ) !== 0;
}

function CalculatorEngine( operation, alu, calculatorBox ) {
    this.o = operation;
    this.alu = alu;
    this.box = calculatorBox;
}

CalculatorEngine.prototype.setOperation = function ( value ) {
    this.act( value, actionTypes.SETTING_OPERATION );
}

CalculatorEngine.prototype.typeDigit = function ( value ) {
    this.act( value, actionTypes.TYPING_DIGIT );
}

CalculatorEngine.prototype.clear = function () {
    this.act( 'C', actionTypes.CLEAR );
}

CalculatorEngine.prototype.calculate = function () {
    this.act( '=', actionTypes.CALCULATE );
}


CalculatorEngine.prototype.performOperation = function () {
    let oper = this.o.operator;
    let first = this.o.firstNumber;
    let second = this.o.secondNumber;
    if ( oper === operators.PLUS )
        this.box.display( this.alu.sum( first, second ) );
    else if ( oper === operators.MINUS )
        this.box.display( this.alu.substract( first, second ) );
    else if ( oper === operators.TIMES )
        this.box.display( this.alu.times( first, second ) );
    else if ( oper === operators.DIVISION )
        this.box.display( this.alu.div( first, second ) );
}


CalculatorEngine.prototype.act = function ( value, actionType ) {
    if ( actionType === actionTypes.TYPING_DIGIT ) {
        var val = extractValue( value );
        if ( this.o.getCurrentState() === operationState.CAPTURING_FIRST_NUMBER ) {
            this.o.firstNumber = getNewNumberValue( this.o.firstNumber, val );
            this.box.display( this.o.firstNumber );
        } else {
            this.o.secondNumber = getNewNumberValue( this.o.secondNumber, val );
            this.box.display( this.o.secondNumber );
        }
    } else if ( actionType === actionTypes.SETTING_OPERATION ) {
        var result = this.box.getValueInDisplay();
        if ( o.isReset() && isDifferentFromZero( result ) )
            this.typeDigit( result );
        this.o.operator = value;
    } else if ( actionType === actionTypes.CLEAR ) {
        this.o.resetOperation();
        this.box.display( 0 );
    } else if ( actionType === actionTypes.CALCULATE ) {
        this.performOperation();
        this.o.resetOperation();
    }
}