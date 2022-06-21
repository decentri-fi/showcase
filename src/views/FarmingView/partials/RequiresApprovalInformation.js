import React from 'react';
import tw from "twin.macro";

export default function RequiresApprovalInformation() {
    return <div tw="bg-white dark:bg-gray-800 ">
        <div
            tw="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <h2 tw="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span tw="block">
                You haven't given this specific contract access yet to asset.
            </span>
                <span tw="underline block text-indigo-500">
                Why is this necessary?
            </span>
            </h2>
        </div>
    </div>;
}