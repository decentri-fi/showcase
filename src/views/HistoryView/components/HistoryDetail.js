import React, {useEffect, useState} from "react";
import {getEvents} from "../../../api/defitrack/events/events";
import {Subheading} from "../../../components/misc/Headings";
import TransferDetail from "./TransferDetail";

import tw from "twin.macro";
import ApprovalDetail from "./ApprovalDetail";

const Wrapper = tw.div`w-full flex grid justify-items-center mt-4 border-b`
const Container = tw.div`w-2/3 border-2 my-4 py-2 rounded-lg`
const TextCenter = tw.div`text-center mb-2`
export default function HistoryDetail({entry, owner}) {

    const [events, setEvents] = useState();

    useEffect(async () => {
        getEvents(entry.id, entry.network).then((result) => {
            setEvents(result);
        });
    }, [])

    const eventDetails = events?.map((event) => {
        if (event.type === "TRANSFER") {
            return <TransferDetail owner={owner} event={event}/>
        } else if (event.type === "APPROVAL") {
            return <ApprovalDetail owner={owner} event={event}/>
        } else {
            return <></>
        }
    });

    return (
        <Wrapper>
            <Container>
                <TextCenter>
                    <Subheading>Transaction Events</Subheading>
                </TextCenter>
                {
                    eventDetails
                }
            </Container>
        </Wrapper>
    )


};



