import Navbar from "./Navbar/Navbar";
import React from "react";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
const NewLabel = tw.span`text-xs align-text-top font-thin text-teal-500`

export default function DashboardNavbar({address, selected = "profile"}) {

    const history = useHistory();

    let items = [
        {
            name: "Profile",
            selected: selected === "profile",
            onClick() {
                history.push(`/${address}/profile`)
            }
        },
        {
            name: "Claimables",
            selected: selected === "claimables",
            onClick() {
                history.push(`/${address}/claimables`)
            }
        },
        {
            name: <span>History <NewLabel>new</NewLabel></span>,
            selected: selected === "history",
            onClick() {
                history.push(`/${address}/history`)
            }
        }
    ];
    return (
        <Navbar items={items}/>
    )
};