var o = new Operation();
var alu = new Alu();
var numBuilder = new NumberBuilder();
var box = new CalculatorOuterBox();
var e = new CalculatorEngine( o, alu, numBuilder, box.getResult, box.setResult );

$( document ).ready( function () {
    box.setActionsForNumbers( function ( val ) {
        e.typeDigit( val )
    } );
    box.setActionsForOperators( function ( val ) {
        e.setOperation( val );
    } );
    box.setActionForEquals( function () {
        e.calculate();
    } );
    box.setActionForClear( function () {
        e.clear();
    } );
    box.setActionForDotButton( function () {
        e.typeDigit( "." );
    } );
} );
