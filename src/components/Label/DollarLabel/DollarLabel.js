import React from "react";
import NumberFormat from "react-number-format";

export default function DollarLabel({amount}) {
    if (amount < 0.01 && amount > 0) {
        return (
            <span>
                <NumberFormat value={0.01} displayType={'text'} fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} prefix={'$'} />
            </span>
        )
    } else {
        return (
            <NumberFormat value={amount} displayType={'text'} fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} prefix={'$'} />
        );
    }
};