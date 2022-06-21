import React, {useState} from 'react';
import SearchField from "../Search/SearchField";
import {PoolingRow} from "../../views/TokenView/partials/PoolingRow";
import tw from "twin.macro";
import {Pagination} from "../Pagination/Pagination";

export default function PoolingOpportunities({poolingOpportunities, title = "Pooling Opportunities"}) {

    const [searchFilter, setSearchFilter] = useState(null)

    const rows = poolingOpportunities.filter((row) => {
        if (searchFilter !== null && searchFilter.length > 0) {
            return row.token.filter(t => {
                return t.symbol.toLowerCase().includes(searchFilter.toLowerCase())
            }).length > 0
        } else {
            return true;
        }
    }).sort((row1, row2) => {
        return row2.marketSize - row1.marketSize
    }).map((row, i) => {
        return (
            <PoolingRow key={i} poolingElement={row}/>
        )
    })

    const search = (e) => {
        setSearchFilter(e.target.value)
    }

    const {
        pagination,
        elements
    } = Pagination(rows);

    return (
        <div tw="bg-white shadow-lg rounded-sm border border-gray-200 w-full">
            <header tw="px-5 py-4 border-b border-gray-100"><h2
                tw="font-semibold text-gray-800">{title}</h2></header>

            <SearchField onChange={search} onClick={e => console.log(e)}/>

            <div tw="p-3">
                <div tw="overflow-x-auto">
                    <table tw="table-auto w-full">
                        <thead tw="text-xs uppercase text-gray-400 bg-gray-100 rounded-sm">
                        <tr>
                            <th tw="p-2">
                                <div tw="font-semibold text-center">Protocol</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center hidden lg:block">Market Size</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center">APR</div>
                            </th>
                            <th tw="p-2">
                                <div tw="font-semibold text-center hidden lg:block">Action</div>
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