$( document ).ready( function () {
    new CalculatorBuilder()
        .buildCalculatorBox()
        .buildCalculatorCircuits()
        .buildEngine()
        .connectBoxWithCircuits()
        .connectBoxWithEngine();
} );
