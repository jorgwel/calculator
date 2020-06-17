function NumberBuilder() {
}

NumberBuilder.prototype.containsADot = function ( currentNumber ) {
    return String( currentNumber ).indexOf( "." ) >= 0;
}

NumberBuilder.prototype.isUserTryingToAddADoubleDot = function ( newValue, currentNumber ) {
    return newValue === '.' && this.containsADot( currentNumber );
}

NumberBuilder.prototype.isUserTryingToAddAZeroToTheRight = function ( newValue, currentNumber ) {
    return String( newValue ) === '0' && String( currentNumber ) === '0';
}

NumberBuilder.prototype.isUserTryingToAddANotZeroNumberAfterAZero = function ( newValue, currentNumber ) {
    return String( newValue ) !== '.' && String( currentNumber ) === '0';
}

NumberBuilder.prototype.isFirstValueForNumber = function ( currentNumber ) {
    return ( currentNumber === null || currentNumber === undefined );
}

NumberBuilder.prototype.joinCurrentAndNewValues = function ( currentNumber, newValue ) {
    return String( currentNumber ) + String( newValue );
}

NumberBuilder.prototype.getNewNumberValue = function ( currentNumber, newValue ) {
    return this.isFirstValueForNumber( currentNumber ) ? newValue
        : this.isUserTryingToAddADoubleDot( newValue, currentNumber ) ? String( currentNumber )
            : this.isUserTryingToAddAZeroToTheRight( newValue, currentNumber ) ? String( 0 )
                : this.isUserTryingToAddANotZeroNumberAfterAZero( newValue, currentNumber ) ? String( newValue )
                    : this.joinCurrentAndNewValues( currentNumber, newValue );
}
