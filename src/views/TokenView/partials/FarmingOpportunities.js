import FallbackImage from "../../../components/Image/FallbackImage";
import DollarLabel from "../../../components/Label/DollarLabel";
import APYLabel from "../../../components/Label/APYLabel";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import React, {useEffect, useState} from "react";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import {fetchStakingMarketsForToken} from "../../../api/defitrack/staking/staking";
import SearchField from "../../../components/Search/SearchField";
import {useHistory} from "react-router-dom";
import {Pagination} from "../../../components/Pagination/Pagination";
import tw from 'twin.macro';

function FarmingRow({farmingElement}) {
    const history = useHistory()


    const reward = farmingElement.reward.map((re) => {
        return re.symbol
    }).reduce((a, b) => {
        return a + ", " + b
    })

    return (
        <tr onClick={() => {
            history.push(`/staking/${farmingElement.network.name}/${farmingElement.protocol.slug}/${farmingElement.id}`);
        }}>
            <td tw="p-2">
                <div tw="flex items-center text-xs">
                    <div tw="w-12 flex-shrink-0 mr-2 sm:mr-3">
                        <FallbackImage src={farmingElement.protocol.logo}/>
                    </div>
                    <div
                        tw="text-gray-800">{farmingElement.stakedToken.name} <span tw="hidden lg:block">→ {reward}</span></div>
                </div>
            </td>
            <td tw="p-2">
                <div tw="text-center text-xs hidden lg:block"><DollarLabel amount={farmingElement.marketSize}/></div>
            </td>
            <td tw="p-2">
                <div tw="text-center text-green-500"><APYLabel amount={farmingElement.rate * 100}/>%</div>
            </td>
            <td tw="p-2 hidden lg:block">
                <div tw="grid justify-items-center">
                    <PrimaryButton label="+" onClick={() => {
                        history.push(`/staking/${farmingElement.network.name}/${farmingElement.protocol.slug}/${farmingElement.id}`);
                    }}/>
                </div>
            </td>
        </tr>
    )
}

export default function FarmingOpportunities({token, network}) {

    const [farmingOpportunities, setFarmingOpportunities] = useState([])

    useEffect(() => {
        async function fetchData() {
            if (token !== null) {
                let protocols = await fetchProtocols();
                for (const proto of protocols) {
                    fetchStakingMarketsForToken(
                        network,
                        proto,
                        token.address
                    ).then((elements) => {
                        for (const element of elements) {
                            setFarmingOpportunities((prevState) => {
                                prevState.push(element)
                                return [...prevState]
                            })
                        }
                    })
                }
            }
        }

        if (token !== null && network !== null) {
            fetchData();
        }
    }, [token, network])

    const [searchFilter, setSearchFilter] = useState(null)

    const rows = farmingOpportunities.filter(row => {
        if (searchFilter !== null && searchFilter.length > 0) {
            return row.stakedToken.name.toLowerCase().includes(searchFilter.toString().toLowerCase());
        } else {
            return true;
        }
    }).sort((row1, row2) => {
        return row2.marketSize - row1.marketSize
    }).map((row, i) => {
        return (
            <FarmingRow key={i} farmingElement={row}/>
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
        <div tw="bg-white shadow-lg rounded-sm border border-gray-200 w-full my-4">
            <header tw="px-5 py-4 border-b border-gray-100"><h2
                tw="font-semibold text-gray-800">Farming Opportunities</h2></header>

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
                            <th tw="p-2 hidden lg:block">
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