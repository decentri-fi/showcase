import React from 'react';
import {ReactComponent as WebsiteIcon} from "../../images/globe.svg";
import {ReactComponent as ArrowIcon} from "../../images/arrow-right-icon.svg";
import ProtocolsThreeColGrid from "../../components/cards/ProtocolsThreeColGrid";
import useProtocolsviewHooks from "./hooks/protocolsview-hooks";
import SearchField from "../../components/Search/SearchField";

export default function ProtocolsView() {

    const protocolsView = useProtocolsviewHooks();

    const cards = protocolsView.protocols.map(protocol => {
        return {
            slug: protocol.slug,
            imageSrc: protocol.logo,
            name: protocol.name,
            position: protocol.primitives.join(','),
            links: [
                {
                    url: protocol.website,
                    icon: WebsiteIcon
                },
                {
                    url: `/protocols/${protocol.slug}`,
                    icon: ArrowIcon
                }
            ]
        }
    })

    return (
        <>
            <ProtocolsThreeColGrid
                heading="Overview"
                subheading="Supported Protocols"
                description="Here's the current list of the supported protocols. The list updates every day as new features get added."
                cards={cards}
            />
        </>
    )
};