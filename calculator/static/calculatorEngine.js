var actionTypes = {
    TYPING_DIGIT: 'TYPING_DIGIT',
    SETTING_OPERATION: 'SETTING_OPERATION',
    CALCULATE: 'CALCULATE',
    CLEAR: 'CLEAR'
};

function CalculatorScreen() {
    this.getResult = null;
    this.setResult = null;
    return this;
}

function EngineCircuits( operation, alu, numberBuilder, screen) {
    this.operation = operation;
    this.alu = alu;
    this.numberBuilder = numberBuilder;
    this.screen = screen;
    return this;
}

function CalculatorEngine( circuits) {
    this.o = circuits.operation;
    this.alu = circuits.alu;
    this.numberBuilder = circuits.numberBuilder;
    this.screen = circuits.screen;
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

CalculatorEngine.prototype.act = function ( value, actionType ) {
    if ( actionType === actionTypes.TYPING_DIGIT ) {
        this.setNewValueOnField( value );
    } else if ( actionType === actionTypes.SETTING_OPERATION ) {
        var result = this.screen.getResult();
        if ( this.o.isReset() && this.isDifferentFromZero( result ) )
            this.typeDigit( result );
        this.o.operator = value;
    } else if ( actionType === actionTypes.CLEAR ) {
        this.o.resetOperation();
        this.screen.setResult( 0 );
    } else if ( actionType === actionTypes.CALCULATE ) {
        var r = this.alu.performOperation( this.o );
        this.screen.setResult( r );
        this.o.resetOperation();
    }
}