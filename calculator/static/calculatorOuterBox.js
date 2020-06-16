
function CalculatorOuterBox(displayFn, getValueInDisplayFn) {
    this.display = displayFn;
    this.getValueInDisplay = getValueInDisplayFn;
}

CalculatorOuterBox.prototype.getValueInDisplay = function () {
    return this.getValueInDisplay();
}
CalculatorOuterBox.prototype.display = function (value) {
    return this.display(value);
}
