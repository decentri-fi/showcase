import {useHistory} from "react-router-dom";
import FallbackImage from "../../../components/Image/FallbackImage";
import DollarLabel from "../../../components/Label/DollarLabel";
import APYLabel from "../../../components/Label/APYLabel";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import React from "react";
import tw from "twin.macro";

export function PoolingRow({poolingElement}) {
    const history = useHistory()

    return (
        <tr onClick={() => {
            history.push(`/pooling/${poolingElement.network.name}/${poolingElement.protocol.slug}/${poolingElement.id}`);
        }}>
            <td tw="p-2">
                <div tw="flex items-center">
                    <div tw="w-12 flex-shrink-0 mr-2 sm:mr-3">
                        <FallbackImage src={poolingElement.protocol.logo}/>
                    </div>
                    <div tw="text-gray-800 text-xs">{poolingElement.name}</div>
                </div>
            </td>
            <td tw="p-2">
                <div tw="text-center text-xs hidden lg:block"><DollarLabel amount={poolingElement.marketSize}/></div>
            </td>
            <td tw="p-2">
                <div tw="text-center text-green-500"><APYLabel amount={poolingElement.apr * 100}/>%</div>
            </td>
            <td tw="p-2">
                <div tw="grid justify-items-center hidden lg:block">
                    <PrimaryButton label="+" onClick={() => {
                        history.push(`/pooling/${poolingElement.network.name}/${poolingElement.protocol.slug}/${poolingElement.id}`);
                    }}/>
                </div>
            </td>
        </tr>
    )
}
