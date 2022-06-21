import React, {useEffect, useState} from 'react';
import FallbackImage from "../../../components/Image/FallbackImage";
import DollarLabel from "../../../components/Label/DollarLabel";
import APYLabel from "../../../components/Label/APYLabel";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import {fetchLendingMarketsForToken} from "../../../api/defitrack/lending/lending";
import tw from 'twin.macro';
import {Pagination} from "../../../components/Pagination/Pagination";

function LendingRow({lendingElement}) {
    return (
        <tr>
            <td tw="p-2">
                <div tw="flex items-center">
                    <div tw="w-12 flex-shrink-0 mr-2 sm:mr-3">
                        <FallbackImage src={lendingElement.protocol.logo}/>
                    </div>
                    <div tw="text-gray-800">{lendingElement.name}</div>
                </div>
            </td>
            <td tw="p-2">
                <div tw="text-center"><DollarLabel amount={lendingElement.marketSize}/></div>
            </td>
            <td tw="p-2">
                <div tw="text-center text-green-500"><APYLabel amount={lendingElement.rate}/>%</div>
            </td>
            <td tw="p-2">
                <div tw="grid justify-items-center">
                    <PrimaryButton label="+" onClick={() => {
                        console.log('start investing')
                    }}/>
                </div>
            </td>
        </tr>
    )
}

export default function LendingOpportunities({token, network}) {

    const [lendingOpportunities, setLendingOpportunities] = useState([])

    useEffect(() => {
        async function fetchData() {
            let protocols = await fetchProtocols();
            for (const proto of protocols) {
                fetchLendingMarketsForToken(
                    network,
                    token.address,
                    proto
                ).then((elements) => {
                    for (const element of elements) {
                        setLendingOpportunities((prevState) => {
                            prevState.push(element)
                            return [...prevState]
                        })
                    }
                })
            }
        }

        if (token !== null && network !== null) {
            fetchData();
        }
    }, [token, network])

    const rows = lendingOpportunities.map((row, i) => {
        return (
            <LendingRow key={i} lendingElement={row}/>
        )
    })


    const {
        pagination,
        elements
    } = Pagination(rows);

    return (
        <div tw="bg-white shadow-lg rounded-sm border border-gray-200 w-full my-4">
            <header tw="px-5 py-4 border-b border-gray-100"><h2
                tw="font-semibold text-gray-800">Lending Opportunities</h2></header>
            <div tw="p-3">
                <div tw="overflow-x-auto">
                    <table tw="table-auto w-full">
                        <thead tw="text-xs uppercase text-gray-400 bg-gray-100 rounded-sm">
                        <tr>
                            <th tw="p-2">
                                <div tw="font-semibold text-left">Protocol</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center">Market Size</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center">APR</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center">Action</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody tw="text-sm font-medium divide-y divide-gray-100">
                        {elements}
                        </tbody>
                    </table>
                    <div tw="w-full grid justify-items-center">
                        <div>
                            {pagination}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}