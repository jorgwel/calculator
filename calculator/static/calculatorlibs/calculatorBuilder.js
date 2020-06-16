function CalculatorBuilder() {
    this.box = null;
    this.circuits = null;
    this.engine = null;
}

CalculatorBuilder.prototype.buildCalculatorBox = function () {
    this.box = new CalculatorOuterBox();
    return this;
}

CalculatorBuilder.prototype.buildCalculatorCircuits = function () {
    var o = new Operation();
    var alu = new Alu();
    var numBuilder = new NumberBuilder();
    var screen = new CalculatorScreen();
    this.circuits = new EngineCircuits( o, alu, numBuilder, screen )
    return this;
}

CalculatorBuilder.prototype.buildEngine = function () {
    this.engine = new CalculatorEngine( this.circuits );
    return this;
}

CalculatorBuilder.prototype.connectBoxWithCircuits = function () {
    this.circuits.screen.setResult = this.box.setResult;
    this.circuits.screen.getResult = this.box.getResult;
    return this;
}

CalculatorBuilder.prototype.connectBoxWithEngine = function () {
    var outThis = this;
    this.box.setActionsForNumbers( function ( val ) {
        outThis.engine.typeDigit( val )
    } );
    this.box.setActionsForOperators( function ( val ) {
        outThis.engine.setOperation( val );
    } );
    this.box.setActionForEquals( function () {
        outThis.engine.calculate();
    } );
    this.box.setActionForClear( function () {
        outThis.engine.clear();
    } );
    this.box.setActionForDotButton( function () {
        outThis.engine.typeDigit( "." );
    } );
    return this;
}