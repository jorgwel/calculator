
function CalculatorEngine( calculatorBox ) {
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

CalculatorEngine.prototype.act = function ( value, actionType ) {
    if ( actionType === actionTypes.TYPING_DIGIT ) {
        this.box.addTypedDigit( value );
    } else if ( actionType === actionTypes.SETTING_OPERATION ) {
        this.box.setOperator( value );
    } else if ( actionType === actionTypes.CLEAR ) {
        this.box.clearCalculator();
    } else if ( actionType === actionTypes.CALCULATE ) {
        this.box.calculateAndReset();
    }
}