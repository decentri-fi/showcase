import React, {useState} from "react";
import HistoryDetail from "./HistoryDetail";
import tw from "twin.macro";

const ListItem = tw.li`flex flex-row`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center py-4 hover:bg-indigo-100`

const TransactionHash = tw.div`w-2/4 pl-1 flex-1 font-medium text-indigo-600 dark:text-gray-200 text-xs font-mono`
const TimeColumn = tw.div`w-1/4 text-gray-700 font-medium leading-relaxed text-secondary-100`
const ActionColumn = tw.div`w-1/12`
const ViewIcon = tw.div`w-8 h-8`
export default function TransactionEntry({entry, address}) {
    const [showDetails, setShowDetails] = useState(false);

    return <>
        <ListItem>
            <Row>
                <TimeColumn>
                    {new Date(entry.time).toLocaleString("en-US")}
                </TimeColumn>
                <TransactionHash>
                    {entry.id}
                </TransactionHash>
                <ActionColumn>
                    <ViewIcon onClick={() => {
                        setShowDetails((prevValue) => {
                            return !prevValue;
                        });
                    }}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <circle cx="12" cy="12" r="1" stroke="#33363F" strokeWidth="2"></circle>
                                <path
                                    d="M18.2265 11.3805C18.3552 11.634 18.4195 11.7607 18.4195 12C18.4195 12.2393 18.3552 12.366 18.2265 12.6195C17.6001 13.8533 15.812 16.5 12 16.5C8.18799 16.5 6.39992 13.8533 5.77348 12.6195C5.64481 12.366 5.58048 12.2393 5.58048 12C5.58048 11.7607 5.64481 11.634 5.77348 11.3805C6.39992 10.1467 8.18799 7.5 12 7.5C15.812 7.5 17.6001 10.1467 18.2265 11.3805Z"
                                    stroke="#33363F" strokeWidth="2"></path>
                                <path
                                    d="M17 4H17.2C18.9913 4 19.887 4 20.4435 4.5565C21 5.11299 21 6.00866 21 7.8V8M17 20H17.2C18.9913 20 19.887 20 20.4435 19.4435C21 18.887 21 17.9913 21 16.2V16M7 4H6.8C5.00866 4 4.11299 4 3.5565 4.5565C3 5.11299 3 6.00866 3 7.8V8M7 20H6.8C5.00866 20 4.11299 20 3.5565 19.4435C3 18.887 3 17.9913 3 16.2V16"
                                    stroke="#33363F" strokeWidth="2" strokeLinecap="round"></path>
                            </g>
                        </svg>
                    </ViewIcon>
                </ActionColumn>
            </Row>
        </ListItem>
        {showDetails &&
            <HistoryDetail owner={address} entry={entry}/>
        }
    </>
}