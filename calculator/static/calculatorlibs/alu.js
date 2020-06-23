var operators = { PLUS: '+', MINUS: '-', TIMES: '*', DIVISION: '/' };

function Alu() {
}

var operationResultType = {
    SUCCESS: 'SUCCESS',
    UNKNOWN_ERROR: 'Unkown error',
    ERROR_DIVISION_BY_ZERO: 'Division by zero',
}

function Result( result, typeOfResult ) {
    this.result = result;
    this.resultType = typeOfResult;
    return this;
}

Alu.prototype.sum = function ( firstNum, secondNum ) {
    return new Big( this.toNumber( firstNum ) ).plus( this.toNumber( secondNum ) ).toString();
}

Alu.prototype.times = function ( firstNum, secondNum ) {
    return new Big( this.toNumber( firstNum ) ).times( this.toNumber( secondNum ) ).toString();
}

Alu.prototype.div = function ( firstNum, secondNum ) {
    return new Big( this.toNumber( firstNum ) ).div( this.toNumber( secondNum ) ).toString();
}

Alu.prototype.substract = function ( firstNum, secondNum ) {
    return new Big( this.toNumber( firstNum ) ).minus( this.toNumber( secondNum ) ).toString();
}

Alu.prototype.toNumber = function ( str ) {
    return Number( str );
}

Alu.prototype.buildErrorResult = function ( e, r ) {
    if ( e.toString().indexOf( "Division by zero" ) >= 0 )
        r = new Result( 'E', operationResultType.ERROR_DIVISION_BY_ZERO );
    else
        r = new Result( 'E', operationResultType.UNKNOWN_ERROR )
    return r;
}

Alu.prototype.performOperation = function ( operation ) {

    var o = operation.operator;
    var f = operation.firstNumber;
    var s = operation.secondNumber;
    var ok = operationResultType.SUCCESS;
    var r = null;
    try {
        if ( o === operators.PLUS )
            r = new Result( this.sum( f, s ), ok );
        else if ( o === operators.MINUS )
            r = new Result( this.substract( f, s ), ok );
        else if ( o === operators.TIMES )
            r = new Result( this.times( f, s ), ok );
        else if ( o === operators.DIVISION )
            r = new Result( this.div( f, s ), ok );
    } catch ( e ) {
        r = this.buildErrorResult( e, r );
    }
    return r;

}

