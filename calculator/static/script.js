

function buildCalculatorBox() {
    return new CalculatorOuterBox();
}

function buildCalculatorCircuits() {
    var o = new Operation();
    var alu = new Alu();
    var numBuilder = new NumberBuilder();
    var screen = new CalculatorScreen();
    var circuits = new EngineCircuits( o, alu, numBuilder, screen)
    return circuits;
}

function buildEngine( circuits) {
    return new CalculatorEngine( circuits);
}

function connectBoxWithCircuits(calculatorBox, calculatorCircuits) {
    calculatorCircuits.screen.setResult = calculatorBox.setResult;
    calculatorCircuits.screen.getResult = calculatorBox.getResult;
}
var box = buildCalculatorBox();
var circuits = buildCalculatorCircuits();
var engine = buildEngine(circuits);

function connectBoxWithEngine( box, engine ) {
    box.setActionsForNumbers( function ( val ) {
        engine.typeDigit( val )
    } );
    box.setActionsForOperators( function ( val ) {
        engine.setOperation( val );
    } );
    box.setActionForEquals( function () {
        engine.calculate();
    } );
    box.setActionForClear( function () {
        engine.clear();
    } );
    box.setActionForDotButton( function () {
        engine.typeDigit( "." );
    } );
}

$( document ).ready( function () {
    connectBoxWithCircuits(box, circuits);
    connectBoxWithEngine(box, engine);
} );
