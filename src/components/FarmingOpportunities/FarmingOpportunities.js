import React, {useEffect, useState} from "react";
import {fetchProtocols} from "../../api/defitrack/protocols/protocols";
import {fetchStakingMarketsForToken} from "../../api/defitrack/staking/staking";
import SearchField from "../Search/SearchField";
import {Pagination} from "../Pagination/Pagination";
import tw from 'twin.macro';
import FarmingRow from "./FarmingRow";

const ListContainer = tw.div`flex grid justify-items-center w-full bg-white`
const List = tw.ul`flex flex-col w-full `

const Center = tw.div`w-full grid justify-items-center`
const Container = tw.div`bg-white shadow-lg rounded-sm border border-gray-200 w-full lg:w-1/2 my-4`
const Header = tw.div`px-5 py-4 border-b border-gray-100 font-semibold text-gray-800`

export default function FarmingOpportunities({farmingOpportunities}) {

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

    if (elements !== undefined && elements.length > 0) {
        return (
            <Center>
                <Container>
                    <Header><h2>Farming Opportunities</h2></Header>

                    <Center>
                        <SearchField onChange={search} onClick={e => console.log(e)}/>
                    </Center>

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