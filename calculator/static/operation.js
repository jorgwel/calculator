var operationState = {
    CAPTURING_FIRST_NUMBER: 'CAPTURING_FIRST_NUMBER',
    CAPTURING_OPERATOR: 'CAPTURING_OPERATOR',
    CAPTURING_SECOND_NUMBER: 'CAPTURING_SECOND_NUMBER'
};

function Operation( firstNumber, secondNumber, operator ) {
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
    this.operator = operator;
    this.state = operationState.NOT_STARTED;

    this.toString = function () {
        return this.firstNumber + " "
            + this.operator + " "
            + this.secondNumber;
    };

    return this;
}

Operation.prototype.isReset = function () {
    return this.firstNumber === null
        && this.secondNumber === null
        && this.operator === null;
}

Operation.prototype.resetOperation = function () {
    o.firstNumber = null;
    o.secondNumber = null;
    o.operator = null;
}

Operation.prototype.getCurrentState = function () {

    if ( this.isUserIntroducingFirstNumber() )
        return operationState.CAPTURING_FIRST_NUMBER;
    else if ( this.isUserIntroducingOperator() )
        return operationState.CAPTURING_OPERATOR;
    else
        return operationState.CAPTURING_SECOND_NUMBER;

}

Operation.prototype.isUserIntroducingFirstNumber = function () {
    return this.operator === null
        && this.secondNumber === null;
}

Operation.prototype.isUserIntroducingOperator = function () {
    return this.firstNumber !== null && this.secondNumber === null;
}
