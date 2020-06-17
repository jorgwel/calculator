function NumberDismantler() {
}

function isNumberSet( number ) {
    return number !== null && number !== undefined;
}

function isZero( number ) {
    return String( number ) === '0';
}

function hasMoreThanOneChar( number ) {
    return String( number ).length > 1;
}

function deleteLastChar( number ) {
    return String( number ).slice( 0, -1 );
}

NumberDismantler.prototype.deleteDigitFromNumber = function ( number ) {
    return !isNumberSet( number ) ? String( 0 )
        : isZero( number ) ? String( number )
            : hasMoreThanOneChar( number ) ? deleteLastChar( number )
                : String( 0 );
}
