var actionTypes = {
    TYPING_DIGIT: 'TYPING_DIGIT',
    SETTING_OPERATION: 'SETTING_OPERATION',
    CALCULATE: 'CALCULATE',
    DELETE_DIGIT: 'DELETE_DIGIT',
    CLEAR: 'CLEAR'
};

function CalculatorPrinter() {
    this.print = null;
    return this;
}

function CalculatorScreen() {
    this.getResult = null;
    this.setResult = null;
    this.setError = null;
    return this;
}

function EngineCircuits( operation, alu, numberBuilder, numberDismantler, screen, printer ) {
    this.operation = operation;
    this.alu = alu;
    this.numberBuilder = numberBuilder;
    this.numberDismantler = numberDismantler;
    this.screen = screen;
    this.printer = printer;
    return this;
}

function CalculatorEngine( circuits ) {
    this.o = circuits.operation;
    this.alu = circuits.alu;
    this.numberBuilder = circuits.numberBuilder;
    this.numberDismantler = circuits.numberDismantler;
    this.screen = circuits.screen;
    this.printer = circuits.printer;
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

CalculatorEngine.prototype.deleteFromCurrentNumber = function () {
    this.act( '<', actionTypes.DELETE_DIGIT );
}

CalculatorEngine.prototype.calculate = function () {
    this.act( '=', actionTypes.CALCULATE );
}

CalculatorEngine.prototype.extractValue = function ( value ) {
    return value === '.' ? value : Number( value );
}

CalculatorEngine.prototype.isDifferentFromZero = function ( value ) {
    return Number( value ) !== 0;
}

CalculatorEngine.prototype.setNewValueOnField = function ( value ) {
    var val = this.extractValue( value );
    if ( this.o.getCurrentState() === operationState.CAPTURING_FIRST_NUMBER ) {
        this.o.firstNumber = this.numberBuilder.getNewNumberValue( this.o.firstNumber, val );
        this.screen.setResult( this.o.firstNumber );
    } else {
        this.o.secondNumber = this.numberBuilder.getNewNumberValue( this.o.secondNumber, val );
        this.screen.setResult( this.o.secondNumber );
    }
}

CalculatorEngine.prototype.deleteDigit = function () {
    if ( this.o.getCurrentState() === operationState.CAPTURING_FIRST_NUMBER ) {
        this.o.firstNumber = this.numberDismantler.deleteDigitFromNumber( this.o.firstNumber );
        this.screen.setResult( this.o.firstNumber );
    } else {
        this.o.secondNumber = this.numberDismantler.deleteDigitFromNumber( this.o.secondNumber );
        this.screen.setResult( this.o.secondNumber );
    }
}

CalculatorEngine.prototype.setSuccessfulCalculationState = function( r ) {
    this.screen.setResult( r.result );
    this.printer.print( this.o.toString() );
    this.printer.print( "=" + r.result );
    this.o.resetOperation();
}

CalculatorEngine.prototype.setErroneousCalculationState = function ( r ) {
    this.printer.printError( this.o.toString() );
    this.printer.printError( r.resultType );
    this.screen.setError( r.result );
}

CalculatorEngine.prototype.performCalculation = function () {
    var r = this.alu.performOperation( this.o );
    if ( r.resultType === operationResultType.SUCCESS )
        this.setSuccessfulCalculationState( r );
    else
        this.setErroneousCalculationState( r );
}

CalculatorEngine.prototype.act = function ( value, actionType ) {
    if ( actionType === actionTypes.TYPING_DIGIT ) {
        this.setNewValueOnField( value );
    }
    if ( actionType === actionTypes.DELETE_DIGIT ) {
        this.deleteDigit();
    } else if ( actionType === actionTypes.SETTING_OPERATION ) {
        var result = this.screen.getResult();
        if ( this.o.isReset() && this.isDifferentFromZero( result ) )
            this.typeDigit( result );
        this.o.operator = value;
    } else if ( actionType === actionTypes.CLEAR ) {
        this.o.resetOperation();
        this.screen.setResult( 0 );
        this.printer.clear();
    } else if ( actionType === actionTypes.CALCULATE ) {
        this.performCalculation();
    }
}