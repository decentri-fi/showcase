import React from 'react';
import tw from 'twin.macro'

const MaxWithObject = tw.object`w-full`;
const MaxWithImg = tw.object`w-full`;

export default function FallbackImage({src}) {

    return (
        <MaxWithObject data={src} type="image/png">
            <MaxWithImg alt="logo" src="https://static.decentri.fi/images/fallback.png"/>
        </MaxWithObject>
    )
};