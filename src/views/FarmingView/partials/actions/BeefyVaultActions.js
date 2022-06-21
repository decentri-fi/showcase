import React from 'react';
import BeefyQuickswapYeet from "./BeefyQuickswapYeet";


function BeefySpecificActions({token, farmingElement, activeToken}) {
    if (token.name.includes('Quickswap')) {
        return <BeefyQuickswapYeet token={token} farmingElement={farmingElement} activeToken={activeToken}/>
    } else {
        return (
            <>
                <p>There are currently no specific actions for this beefy vault.</p>
            </>
        );
    }
}

export default function BeefyVaultActions({token, farmingElement}) {
    return (
        <>
            <BeefySpecificActions token={token} farmingElement={farmingElement}/>
        </>
    )
};