

function buildCalculatorBox() {
    return new CalculatorOuterBox();
}

function buildScreen(box) {
    return new Screen( box.getResult, box.setResult );
}

function buildCalculatorCircuits() {
    var o = new Operation();
    var alu = new Alu();
    var numBuilder = new NumberBuilder();
    var circuits = new EngineCircuits( o, alu, numBuilder )
    return circuits;
}

function buildEngine( circuits, screen ) {
    return new CalculatorEngine( circuits, screen );
}

var box = buildCalculatorBox();
var screen = buildScreen(box);
var circuits = buildCalculatorCircuits();
var engine = buildEngine(circuits, screen);

function connect( box, engine ) {
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
    connect(box, engine);
} );
