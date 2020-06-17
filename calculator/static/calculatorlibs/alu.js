var operators = { PLUS: '+', MINUS: '-', TIMES: '*', DIVISION: '/' };

function Alu() {
}

var operationResultType = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
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

Alu.prototype.performOperation = function ( operation ) {

    var op = operation.operator;
    var f = operation.firstNumber;
    var s = operation.secondNumber;
    var ok = operationResultType.SUCCESS;
    var r = null;
    try {
        if ( op === operators.PLUS )
            r = new Result( this.sum( f, s ), ok );
        else if ( op === operators.MINUS )
            r = new Result( this.substract( f, s ), ok );
        else if ( op === operators.TIMES )
            r = new Result( this.times( f, s ), ok );
        else if ( op === operators.DIVISION )
            r = new Result( this.div( f, s ), ok );
    } catch ( e ) {
        r = new Result( 'E', operationResultType.ERROR )
    }
    return r;

}

