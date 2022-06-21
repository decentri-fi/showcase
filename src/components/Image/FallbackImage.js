import React from 'react';
import tw from 'twin.macro'

export default function FallbackImage({src}) {

    return (
        <object tw="w-full" data={src} type="image/png">
            <img tw="w-full" alt="logo" src="https://static.defitrack.io/images/fallback.png"/>
        </object>
    )
};