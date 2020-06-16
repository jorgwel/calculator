
function CalculatorEngine( operation, alu, numberBuilder, calculatorBox ) {
    this.o = operation;
    this.alu = alu;
    this.numberBuilder = numberBuilder;
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

CalculatorEngine.prototype.extractValue = function( value ) {
    return value === '.' ? value : Number( value );
}

CalculatorEngine.prototype.isDifferentFromZero = function( value ) {
    return Number( value ) !== 0;
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
        var val = this.extractValue( value );
        if ( this.o.getCurrentState() === operationState.CAPTURING_FIRST_NUMBER ) {
            this.o.firstNumber = this.numberBuilder.getNewNumberValue( this.o.firstNumber, val );
            this.box.display( this.o.firstNumber );
        } else {
            this.o.secondNumber = this.numberBuilder.getNewNumberValue( this.o.secondNumber, val );
            this.box.display( this.o.secondNumber );
        }
    } else if ( actionType === actionTypes.SETTING_OPERATION ) {
        var result = this.box.getValueInDisplay();
        if ( o.isReset() && this.isDifferentFromZero( result ) )
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