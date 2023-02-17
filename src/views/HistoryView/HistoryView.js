import React from "react";
import {useHistory, useParams} from "react-router-dom";
import CustomHeader from "../../components/Header/CustomHeader";
import tw from "twin.macro";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";
import RequiresFishTracking from "../../components/RequiresFishTracking";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import DashboardNavbar from "../../components/DashboardNavbar";
import useHistoryHooks from "./hooks/useHistoryHooks";
import TransactionEntry, {TransactionEntryPlaceholder} from "./components/TransactionEntry";

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center`
const Center = tw.div`w-full flex grid justify-items-center mb-3`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;
const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const HighlightedText = tw.span`text-primary-500`


const Section = tw.div`grid w-full justify-items-center pt-2`


export default function HistoryView() {

    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const {
        eventsPerTransaction,
        transactionsPerId,
        loading
    } = useHistoryHooks(address);

    const onAddressChange = (address) => {
        history.push(`/${address}/history`);
    };


    const entries = Object.keys(eventsPerTransaction).map((key) => {
        const events = eventsPerTransaction[key];
        return {
            tx: key,
            events: events
        }
    }).map((entry) => {
        return (
            <TransactionEntry transaction={transactionsPerId[entry.tx]} events={entry.events} owner={address}/>
        )
    });

    return <>
        <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
        <Container>
            <DashboardWrapper>
                <Center>
                    <DashboardNavbar address={address} selected={"history"}/>
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
                        loading && entries.length === 0 &&
                        <Center>
                            <TransactionEntryPlaceholder/>
                        </Center>
                    }

                    {
                        entries?.length > 0 &&

                        <Center>
                            {entries}
                        </Center>
                    }


                    {
                        !loading && entries?.length === 0 &&
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
};




