import React, {useState} from "react";
import tw from "twin.macro";
import CustomHeader from "../components/Header/CustomHeader";
import {Badge, Calendar, CheckPicker, Form, Popover, Whisper} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import FooterV2 from "../components/Footer/FooterV2";
import {SectionHeading} from "../components/misc/Headings";

const Header = tw(SectionHeading)`mt-12`;

export default function CalendarView() {


    const [filter, setFilter] = useState([]);

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
            const theDate = new Date(item.date);
            return theDate.getDate() === date.getDate() && theDate.getMonth() === date.getMonth() && theDate.getFullYear() === date.getFullYear()
        });

        return elements.map((item) => {
            return {
                //time: item.startDate,
                badge: getBadge(item),
                title: item.title,
                description: item.description,
                type: item.type
            }
        }).filter((item) => {
            if (filter.length === 0) {
                return true;
            }
            return filter.includes(item.type);
        });
    }

    const data = [
        {label: 'Ethereum Upgrade', value: 'ethereum_upgrade'},
        {label: 'Bitcoin Upgrade', value: 'bitcoin_upgrade'},
        {label: 'Conference', value: 'conference'},
    ].map(
        item => ({label: item.label, value: item.value})
    );


    function getBadge(item) {
        switch (item.type) {
            case 'ethereum_upgrade':
                return <Badge color={"green"}></Badge>
            case 'bitcoin_upgrade':
                return <Badge color={"yellow"}></Badge>
            default:
                return <Badge color={"orange"}/>;
        }
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
                            <Whisper
                                placement="top"
                                trigger="click"
                                speaker={
                                    <Popover>
                                        {item.description}
                                    </Popover>
                                }>
                                <span>{item.badge} {item.title}</span>
                            </Whisper>
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

            <Header>Web3 <span tw="text-primary-500">Event Calendar </span></Header>

            <div tw="flex w-full">
                <div tw="w-3/4">
                    <Calendar renderCell={renderCell} bordered={true}/>
                </div>
                <div tw="w-1/4 border p-4 m-3 rounded">
                    <Form>
                        <Form.Group>
                            <Form.ControlLabel>Filter</Form.ControlLabel>
                            <CheckPicker onChange={(elements) => {
                                setFilter(elements)
                            }} label="Event Type" data={data} style={{width: 224}}/>
                            <Form.HelpText>using no filter returns all data</Form.HelpText>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <FooterV2/>
        </>
    )
};