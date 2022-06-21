import React from "react";
import tw from "twin.macro"
export default function DetailCard({centerHtml, title, icon, bottomHtml = <></>}) {
    return (
        <div tw="flex px-2 mb-2">
            <div tw="shadow-md hover:shadow-lg  w-full p-2 bg-white dark:bg-gray-800">
                <div tw="flex items-center">
                    <div>
                        {icon}
                    </div>
                    <div tw="ml-2">
                        <p tw="text-xs text-gray-800 dark:text-gray-100">
                            {title}
                        </p>
                        <p tw="text-gray-800 text-sm dark:text-white font-bold">
                            {centerHtml}
                        </p>
                    </div>
                </div>
                <div tw="flex flex-col justify-start">

                </div>
                {bottomHtml}
            </div>
        </div>
    )
};