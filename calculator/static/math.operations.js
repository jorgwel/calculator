function MathOperations() {
}
MathOperations.prototype.sum = function(firstNum, secondNum) {
    return new Big(this.toNumber(firstNum)).plus(this.toNumber(secondNum)).toString();
}

MathOperations.prototype.times = function(firstNum, secondNum) {
    return new Big(this.toNumber(firstNum)).times(this.toNumber(secondNum)).toString();
}

MathOperations.prototype.div = function(firstNum, secondNum) {
    return new Big(this.toNumber(firstNum)).div(this.toNumber(secondNum)).toString();
}

MathOperations.prototype.substract = function(firstNum, secondNum) {
    return new Big(this.toNumber(firstNum)).minus(this.toNumber(secondNum)).toString();
}

MathOperations.prototype.toNumber = function(str) {
    return Number(str);
}

