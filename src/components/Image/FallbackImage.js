import React from 'react';
import tw from 'twin.macro'

const MaxWidthObject = tw.object`w-full`;
const MaxWidthImg = tw.img`w-full`;

export default function FallbackImage({src}) {

    return (
        <MaxWidthObject data={src} type="image/png">
            <MaxWidthImg alt="logo" src="https://static.decentri.fi/images/fallback.png"/>
        </MaxWidthObject>
    )
};