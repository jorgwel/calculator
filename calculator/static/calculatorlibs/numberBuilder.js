function NumberBuilder() {}

NumberBuilder.prototype.containsADot = function ( currentNumber ) {
    return String( currentNumber ).indexOf( "." ) >= 0;
}

NumberBuilder.prototype.isUserTryingToAddADoubleDot = function ( newValue, currentNumber ) {
    return newValue === '.' && this.containsADot( currentNumber );
}

NumberBuilder.prototype.isFirstValueForNumber = function ( currentNumber ) {
    return currentNumber === null;
}

NumberBuilder.prototype.joinCurrentAndNewValues = function ( currentNumber, newValue ) {
    return String( currentNumber ) + String( newValue );
}

NumberBuilder.prototype.getNewNumberValue = function ( currentNumber, newValue ) {
    return this.isFirstValueForNumber( currentNumber ) ? newValue
        : this.isUserTryingToAddADoubleDot( newValue, currentNumber ) ? String( currentNumber )
            : this.joinCurrentAndNewValues( currentNumber, newValue );
}
