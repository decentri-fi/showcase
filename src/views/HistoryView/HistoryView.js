import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import CustomHeader from "../../components/Header/CustomHeader";
import Navbar from "../../components/Navbar/Navbar";
import tw from "twin.macro";
import {getTransactions} from "../../api/whalespotter/transactions/transactions.js";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";
import {getFish} from "../../api/whalespotter/fish/fish";
import NoFishYet from "./NoFishYet";
import useSiwe from "../../hooks/siwe/useSiwe";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import TransactionEntry from "./components/TransactionEntry";

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center`
const Center = tw.div`w-full flex grid justify-items-center mb-3`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;
const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const HighlightedText = tw.span`text-primary-500`

const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800`
const List = tw.ul`flex flex-col w-full`

const Section = tw.div`grid w-full justify-items-center pt-2`

export default function HistoryView() {

    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const siwe = useSiwe();

    const [hasAddedAsFish, setHasAddedAsFish] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(async () => {
        const fish = await getFish(siwe.getAddress());
        setHasAddedAsFish(fish.map(f => {
            return f.address
        }).includes(address));
    }, [])

    useEffect(async () => {
        document.title = `History for ${address} - Decentrifi`;
        const result = await getTransactions(address)
        setTransactions(result);
    }, []);

    const onAddressChange = (address) => {
        history.push(`/${address}/history`);
    };


    const entries = transactions?.map((transaction) => {
        return (
            <TransactionEntry entry={transaction} address={address}/>
        )
    });

    const details = hasAddedAsFish && siwe.getAddress() != null ?
        <>
            <SectionWithBackground>
                <Subheading>A little bit of history</Subheading>
                <Heading><HighlightedText>DEFI</HighlightedText> ACTIVITIES</Heading>
                <Description>Here's an overview of your asset transfers, claims, LP activities and borrows
                    events.</Description>
            </SectionWithBackground>
            <DashboardWrapper>
                {
                    entries?.length > 0 &&

                    <Center>
                        <div tw="w-2/3">
                            <ListContainer>
                                <List>
                                    {entries}
                                </List>
                            </ListContainer>
                        </div>
                    </Center>
                }

                {
                    entries?.length === 0 &&
                    <Section>
                        <TwoColSingleFeatureWithStats2
                            subheading={"History unavailable"}
                            heading={"Unable to locate history for this specific address"}
                            description={"We are unable to locate any history for this address. Please check the address and try again."}
                            primaryButtonText={"Refresh"}
                            primaryButtonUrl={`/${address}/history`}
                            secondaryButtonText={"Back to overview"}
                            secondaryButtonUrl={`/${address}/profile`}
                        />
                    </Section>
                }
            </DashboardWrapper>
        </>
        : <NoFishYet address={address}/>


    return <div tw="w-full">
        <CustomHeader onAddressChange={onAddressChange}></CustomHeader>
        <Container>
            <DashboardWrapper>
                <Center>
                    <Navbar items={
                        [
                            {
                                name: "Profile",
                                selected: false,
                                url: '/dashboard',
                                onClick() {
                                    history.push(`/${address}/profile`)
                                }
                            },
                            {
                                name: "Claimables",
                                selected: false,
                                url: '#',
                                onClick() {
                                    history.push(`/${address}/claimables`)
                                }
                            },
                            {
                                name: "History",
                                selected: true,
                                url: '#'
                            }
                        ]
                    }/>
                </Center>
            </DashboardWrapper>

            {details}
        </Container>

    </div>
};