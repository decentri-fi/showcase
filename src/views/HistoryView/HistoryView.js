import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import CustomHeader from "../../components/Header/CustomHeader";
import Navbar from "../../components/Navbar/Navbar";
import tw from "twin.macro";
import {getEvents} from "../../api/whalespotter/transactions/transactions.js";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";
import RequiresFishTracking from "../../components/RequiresFishTracking";
import useSiwe from "../../hooks/siwe/useSiwe";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import HistoryDetail from "./components/HistoryDetail";
import DashboardNavbar from "../../components/DashboardNavbar";

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center`
const Center = tw.div`w-full flex grid justify-items-center mb-3`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;
const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const HighlightedText = tw.span`text-primary-500`

const ListContainer = tw.div`p-4 flex w-2/3 mx-auto mt-2  justify-center bg-white dark:bg-gray-800 mb-4 border`
const List = tw.ul`w-10/12 flex flex-col w-full`

const Section = tw.div`grid w-full justify-items-center pt-2`

const TransactionDetails = tw.div`text-xs w-2/12 flex justify-items-center grid text-center items-center`
const AccountLink = tw.div`flex items-center `
export default function HistoryView() {

    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const siwe = useSiwe();

    const [events, setEvents] = useState([]);

    useEffect(async () => {
        document.title = `History for ${address} - Decentrifi`;
        if (address) {
            const events = await getEvents(address, siwe.getAddress());
            setEvents(events);
        }
    }, []);

    const onAddressChange = (address) => {
        history.push(`/${address}/history`);
    };

    const eventsPerTransaction = events.reduce((acc, event) => {
        if (acc[event.transaction.id] == null) {
            acc[event.transaction.id] = []
        }
        acc[event.transaction.id].push(
            event
        )
        return acc
    }, {});

    const transactionsPerId = events.reduce((acc, event) => {
        if (acc[event.transaction.id] == null) {
            acc[event.transaction.id] = event.transaction
        }
        return acc
    }, {});

    const entries = Object.keys(eventsPerTransaction).map((key) => {
        const events = eventsPerTransaction[key];
        return {
            tx: key,
            events: events
        }
    }).map((entry) => {
        return (
           <HistoryEntry transaction={transactionsPerId[entry.tx]} events={entry.events} />
        )
    });

    return <>
        <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
        <Container>
            <DashboardWrapper>
                <Center>
                    <DashboardNavbar address={address} selected={"history"} />
                </Center>
            </DashboardWrapper>
            <RequiresFishTracking address={address}>
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
                            {entries}
                        </Center>
                    }

                    {
                        entries?.length === 0 &&
                        <Section>
                            <TwoColSingleFeatureWithStats2
                                statistics={[]}
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
            </RequiresFishTracking>
        </Container>

    </>

    function HistoryEntry({transaction, events}) {

        const eventItems = events.map((event) => {
            return <HistoryDetail event={event} owner={address}/>
        });


        return (
            <ListContainer>
                <TransactionDetails>
                    <span>
                        <AccountLink>{sliceAccount(transaction.id)}
                            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M16.1147 9.99466C16.5956 9.99466 16.989 10.3881 17 10.869V14.3883C17 15.8308 15.8305 17.0002 14.3879 17.0002H5.61173C4.16919 17.0002 3 15.831 3 14.3881V5.61208C2.99983 4.16954 4.16901 3 5.61173 3H9.12C9.35168 3.00065 9.57369 3.09297 9.73752 3.25679C9.90134 3.42062 9.99367 3.64263 9.99431 3.87431C9.99367 4.10599 9.90134 4.328 9.73752 4.49183C9.57369 4.65565 9.35168 4.74798 9.12 4.74862H5.61173C5.131 4.74862 4.74845 5.1422 4.74845 5.61208V14.3772C4.74845 14.8581 5.14185 15.2407 5.61173 15.2407H14.3769C14.8578 15.2407 15.2404 14.8471 15.2404 14.3772V10.869C15.241 10.6373 15.3333 10.4153 15.4971 10.2515C15.661 10.0876 15.883 9.99531 16.1147 9.99466ZM16.1147 3C16.5956 3 16.989 3.3934 17 3.87431V7.37173C16.9994 7.60344 16.907 7.82548 16.7431 7.98931C16.5793 8.15314 16.3572 8.24544 16.1255 8.24604C15.8938 8.24539 15.6718 8.15307 15.508 7.98925C15.3442 7.82542 15.2518 7.60341 15.2512 7.37173V5.98361L9.31688 11.9181C9.14188 12.0821 8.9233 12.1696 8.69387 12.1696C8.46427 12.1696 8.24587 12.0931 8.07086 11.9181C7.73206 11.5793 7.73206 11.0221 8.07086 10.6831L14.0052 4.7488H12.6174C12.3857 4.74815 12.1637 4.6558 11.9998 4.49194C11.836 4.32808 11.7437 4.10602 11.7431 3.87431C11.7438 3.64263 11.8361 3.42062 11.9999 3.25679C12.1637 3.09297 12.3857 3.00065 12.6174 3H16.1147Z"
                                        fill="currentColor"></path>
                    </svg>
                        </AccountLink>
                        {new Date(transaction.time).toLocaleString("en-US")}
                    </span>
                </TransactionDetails>
                <List>
                    {eventItems}
                </List>
            </ListContainer>
        )
    }
};




const sliceAccount = function (address) {
    return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
};