import React, {useEffect, useState} from "react";
import SearchField from "../Search/SearchField";
import {Pagination} from "../Pagination/Pagination";
import tw from 'twin.macro';
import FarmingRow from "./FarmingRow";
import {Button} from "@mui/material";

const ListContainer = tw.div`flex grid justify-items-center w-full bg-white mb-4`
const List = tw.ul`flex flex-col w-full `

const Center = tw.div`w-full grid justify-items-center`
const Container = tw.div`bg-white shadow-lg rounded-sm border border-gray-200 w-full lg:w-2/3 my-4 py-4`
const Header = tw.div`px-5 py-4 border-b border-gray-100 font-semibold text-gray-800`
const NetworkContainer = tw.div`px-5`
const ButtonWrapper = tw.span`px-1`


export default function FarmingOpportunities({farmingOpportunities}) {

    const [searchFilter, setSearchFilter] = useState(null)
    const [networkFilter, setNetworkFilter] = useState([])
    const [networkButtons, setNetworkButtons] = useState([]);


    const networks = Array.from(
        new Set(
            farmingOpportunities.map((opportunity) => {
                return opportunity.network.name
            })
        )
    );

    useEffect(() => {
        networks.forEach((network) => {
            setNetworkFilter((prevState) => {
                if (!prevState.includes(network)) {
                    prevState.push(network)
                }
                return [...prevState];
            });
        })
    }, [farmingOpportunities])

    useEffect(() => {
        const buttons = networks.map((network) => {
            const onClick = () => {
                setNetworkFilter((prevState) => {
                    if (prevState.includes(network)) {
                        return [...prevState.filter(x => x !== network)]
                    } else {
                        prevState.push(network);
                        return [...prevState];
                    }
                });
            }

            const getVariant = () => {
                return networkFilter.includes(network) ? "contained" : "outlined"
            }

            return (
                <ButtonWrapper>
                    <Button onClick={onClick} variant={getVariant()} color={"success"}>{network}</Button>
                </ButtonWrapper>
            )
        })
        setNetworkButtons(buttons);
    }, [networkFilter]);

    const rows = farmingOpportunities.filter(row => {
        if (searchFilter !== null && searchFilter.length > 0) {
            return row.stakedToken.name.toLowerCase().includes(searchFilter.toString().toLowerCase());
        } else {
            return true;
        }
    }).filter((row) => {
        return (networkFilter.includes(row.network.name))
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

    if (farmingOpportunities.length > 0) {
        return (
            <Center>
                <Container>
                    <Header><h2>Farming Opportunities</h2></Header>
                    <NetworkContainer>{networkButtons}</NetworkContainer>
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