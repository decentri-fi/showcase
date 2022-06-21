import React from "react";
import NumberFormat from "react-number-format";

export default function APYLabel({amount}) {
    return (
        <NumberFormat value={amount} displayType={'text'} decimalScale={2} thousandSeparator={true} />
    )
};