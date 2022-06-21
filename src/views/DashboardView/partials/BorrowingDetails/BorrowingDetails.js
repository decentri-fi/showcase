import React from "react";
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import tw from "twin.macro";
import FallbackImage from "../../../../components/Image/FallbackImage"; //eslint-disable-line

function BorrowList({borrowings}) {
    return <div tw="w-full px-4">
        <div
            tw="flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800">
            <ul tw="flex flex-col w-full ">
                {
                    borrowings.map((borrow, i) => {
                        return (<BorrowElement key={i} borrow={borrow}/>)
                    })
                }
            </ul>
        </div>
    </div>
}

function BorrowElement({borrow}) {
    return (
        <li tw="flex flex-row hover:bg-orange-100">
            <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div
                    tw="flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block">
                    <a href="#" tw="block relative">
                        <div tw="flex flex-nowrap">
                            <div tw="h-5 w-5 lg:h-8 lg:w-8">
                                <FallbackImage src={borrow.protocol.logo}/>
                            </div>
                            <div tw="lg:h-4 lg:w-4 h-2 w-2 -mx-2 ">
                                <FallbackImage src={borrow.network.logo}/>
                            </div>
                        </div>
                    </a>
                </div>
                <div tw="flex-1 pl-1 mr-16 w-1/3 lg:w-2/5">
                    <div tw="text-yellow-600 text-xs overflow-auto">
                        {borrow.name}
                    </div>
                </div>
                <div tw="text-xs text-left text-gray-600 dark:text-gray-200 w-2/5 lg:w-1/5">
                    <div tw="flex flex-col">
                        <div>
                        <span tw="text-gray-600 text-xs">
                              <NumberFormat
                                  value={borrow.amount} displayType={'text'} decimalScale={4}
                                  thousandSeparator={true}/>
                            </span> <span tw="text-green-500 font-thin">{borrow.symbol}</span>
                        </div>
                    </div>
                </div>
                <div tw="text-xs text-left text-gray-600 dark:text-gray-200 w-2/5 lg:w-1/5 grid justify-items-end">
                    <div tw="flex flex-col">
                        <div tw="font-bold text-sm">
                            <DollarLabel amount={borrow.dollarValue}/>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default function BorrowingDetails({protocol, dashboardHooks}) {

    const elements = dashboardHooks.borrowings.filter(borrow => {
        return borrow.protocol.slug === protocol.slug
    })


    if (elements.length === 0) {
        return (
            <></>
        )
    }
    return (

        <div tw="w-full grid justify-items-center my-4">
            <div tw="flex w-full items-center mb-2">
                    <h3 tw="text-sm font-medium mb-2 bg-gray-600 rounded-r p-1 text-white">Borrowing Overview (<DollarLabel amount={dashboardHooks.totalBorrowingForProtocol(protocol)}></DollarLabel>)</h3>
            </div>
            <BorrowList borrowings={elements}/>
        </div>
    )
};