import React, {useEffect, useState} from 'react';
import FallbackImage from "../Image/FallbackImage";
import DollarLabel from "../Label/DollarLabel";
import APYLabel from "../Label/APYLabel";
import PrimaryButton from "../Button/PrimaryButton";
import {fetchProtocols} from "../../api/defitrack/protocols/protocols";
import {fetchLendingMarketsForToken} from "../../api/defitrack/lending/lending";
import tw from 'twin.macro';
import {Pagination} from "../Pagination/Pagination";
import LendingRow from "./LendingRow";

const ListContainer = tw.div`flex grid justify-items-center w-full bg-white mb-4`
const List = tw.ul`flex flex-col w-full `


const Center = tw.div`w-full grid justify-items-center`
const Container = tw.div`bg-white shadow-lg rounded-sm border border-gray-200 w-full lg:w-1/2 my-4 py-4`
const Header = tw.div`px-5 py-4 border-b border-gray-100 font-semibold text-gray-800`

export default function LendingOpportunities({lendingOpportunities}) {



    const rows = lendingOpportunities.map((row, i) => {
        return (
            <LendingRow key={i} lendingElement={row}/>
        )
    })

    const {
        pagination,
        elements
    } = Pagination(rows);

    if (elements !== undefined && elements.length > 0) {
        return (
            <Center>
                <Container>
                    <Header><h2>Lending Opportunities</h2></Header>
                    <ListContainer>
                        <List>
                            {elements}
                        </List>
                    </ListContainer>
                    <Center>
                        <div>
                            {pagination}
                        </div>
                    </Center>
                </Container>
            </Center>
        );
    } else {
        return <></>
    }
}