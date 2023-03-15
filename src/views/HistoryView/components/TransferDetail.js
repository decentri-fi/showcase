import BigNumber from "bignumber.js";
import React from "react";
import FallbackImage from "../../../components/Image/FallbackImage";
import tw from "twin.macro";

const Container = tw.div`w-full flex lg:px-4`
const TypeColumn = tw.div`lg:w-1/6 w-1/2 text-center`
const TypeLabel = tw.span`px-2 font-medium  rounded bg-purple-100 mx-4 my-1`

const AmountColumn = tw.div`lg:w-1/3 w-1/2 flex items-center text-center font-mono`
const SymbolColumn = tw.div`w-1/2 lg:w-1/6 text-right grid  justify-items-center lg:justify-items-end`
const Center = tw.div`flex items-center`

const AssetLogo = tw.div`w-5 h-5`
const AssetText = tw.span`text-green-500 font-thin`
const FromOrToColumn = tw.div`lg:w-1/3 w-1/2  lg:text-right font-mono`

export default function TransferDetail({event, owner}) {
    const sign = (() => {
        if (event.metadata.from.toLowerCase() === owner.toLowerCase()) {
            return '-';
        } else {
            return '+';
        }
    })();

    const fromOrTo = (() => {
        if (event.metadata.from.toLowerCase() === owner.toLowerCase()) {
            return 'to';
        } else {
            return 'from';
        }
    })();

    const fromOrToAddress = (() => {
        if (event.metadata.from.toLowerCase() === owner.toLowerCase()) {
            return sliceAccount(event.metadata.to);
        } else {
            return sliceAccount(event.metadata.from);
        }
    })();

    if (!new BigNumber(0).isLessThan(new BigNumber(event.metadata.amount))) {
        return null;
    }

    if(event.metadata.from.toLowerCase() != owner.toLowerCase() &&
        event.metadata.to.toLowerCase() != owner.toLowerCase()
    ) {
        return null;
    }

    return (
        <Container>
            <TypeColumn>
                <TypeLabel>transfer</TypeLabel>
            </TypeColumn>
            <AmountColumn>{normalized(sign, event.metadata.amount, event.metadata.asset.decimals)}</AmountColumn>
            <SymbolColumn>
                <Center>
                    <AssetText>{event.metadata.asset.symbol}</AssetText>
                    &nbsp;
                    <AssetLogo><FallbackImage src={event.metadata.asset.logo} alt={event.metadata.asset.symbol}/></AssetLogo>
                </Center>
            </SymbolColumn>
            <FromOrToColumn>
                <a href={`${event.network.baseUrl}/address/${fromOrToAddress}`}>{fromOrTo}: {fromOrToAddress}</a>
            </FromOrToColumn>
        </Container>
    );
}

const normalized = function (sign, amount, decimals = 18) {
    if (amount == null) {
        return "0.00"
    } else {
        const result = new BigNumber(amount).dividedBy(
            new BigNumber(10).exponentiatedBy(decimals)
        )
        if (new BigNumber(0).isLessThan(result)) {
            return `~ ${sign}${result.toFixed(6, 0)}`;
        } else {
            return <span>&nbsp;&nbsp;&nbsp;0.00</span>;
        }
    }
};

const sliceAccount = function (address) {
    return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
};