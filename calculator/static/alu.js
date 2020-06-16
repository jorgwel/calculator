function Alu() {
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

    if ( op === operators.PLUS )
        return this.sum( f, s );
    else if ( op === operators.MINUS )
        return this.substract( f, s );
    else if ( op === operators.TIMES )
        return this.times( f, s );
    else if ( op === operators.DIVISION )
        return this.div( f, s );
}

