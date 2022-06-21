import React from "react";
import tw from "twin.macro";

export default function PrimaryButton({onClick, label}) {
    return (
        <button onClick={onClick} tw="bg-green-500 text-white font-semibold border rounded py-2 px-4 hover:bg-transparent hover:text-green-700 hover:border-green-400">{label}</button>
    )
};