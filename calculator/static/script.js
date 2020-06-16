var actionTypes = {
    TYPING_DIGIT: 'TYPING_DIGIT',
    SETTING_OPERATION: 'SETTING_OPERATION',
    CALCULATE: 'CALCULATE',
    CLEAR: 'CLEAR'
};

var operators = { PLUS: '+', MINUS: '-', TIMES: '*', DIVISION: '/' };
var ui = new Ui();
var math = new Alu();
var o = new Operation();
var box = new CalculatorOuterBox( ui.setResult, ui.getResult );
var numBuilder = new NumberBuilder();
var e = new CalculatorEngine( o, math, numBuilder, box );

$( document ).ready( function () {
    ui.setActionsForNumbers( function ( val ) {
        e.typeDigit( val )
    } );
    ui.setActionsForOperators( function ( val ) {
        e.setOperation( val );
    } );
    ui.setActionForEquals( function () {
        e.calculate();
    } );
    ui.setActionForClear( function () {
        e.clear();
    } );
    ui.setActionForDotButton( function () {
        e.typeDigit( "." );
    } );
} );
