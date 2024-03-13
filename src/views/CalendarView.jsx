import React from "react";
import tw from "twin.macro";
import CustomHeader from "../components/Header/CustomHeader";
import {Badge, Calendar, Popover, Whisper} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import FooterV2 from "../components/Footer/FooterV2";

export default function CalendarView() {


    const query = useQuery({
        queryKey: 'calendar',
        staleTime: 300 * 1000, //every 300 secs
        queryFn: async () => {
            const response = await axios.get('https://whalespotter.decentri.fi/calendar');
            return response.data;
        }
    })

    function getTodoList(date) {
        const elements = (query.data || []).filter((item) => {
            const theDate = new Date(item.startDate);
            return theDate.getDate() === date.getDate();
        });

        return elements.map((item) => {
            return {
                //time: item.startDate,
                title: item.title
            }
        });
    }

    function renderCell(date) {
        const list = getTodoList(date);
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                <li>
                    <Whisper
                        placement="top"
                        trigger="click"
                        speaker={
                            <Popover>
                                {list.map((item, index) => (
                                    <p key={index}>
                                        {item.title}
                                    </p>
                                ))}
                            </Popover>
                        }>
                        <a>{moreCount} more</a>
                    </Whisper>
                </li>
            );

            return (
                <ul className="calendar-todo-list">
                    {displayList.map((item, index) => (
                        <li key={index}>
                            <Badge/> {item.title}
                        </li>
                    ))}
                    {moreCount ? moreItem : null}
                </ul>
            );
        }
        return null;
    }

    return (
        <>
            <CustomHeader showSearch={false} showUserLink={false}/>
            <div tw="mx-4">
                <Calendar renderCell={renderCell} bordered="true"/>
            </div>
            <FooterV2/>
        </>
    )
};