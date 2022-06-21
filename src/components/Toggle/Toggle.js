import React from 'react';
import tw from "twin.macro";
import {ToggleButton} from "@mui/material";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline"; //eslint-disable-line

export default function Toggle({onChange, checked, checkedLabel = <EyeOffIcon tw="h-4" />, uncheckedLabel = <>
    <EyeIcon tw="h-4"/>
    </>
    }) {

    const theLabel = checked ? checkedLabel : uncheckedLabel;

    return (
        <>
            <ToggleButton value="check" selected={checked} onChange={() => onChange(!checked)}>{theLabel}</ToggleButton>
        </>
    )
};