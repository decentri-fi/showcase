import React from 'react';
import TwoColContactUsWithIllustration from "../../components/forms/TwoColContactUsWithIllustration";
import useProtocolViewHooks from "./hooks/protocolview-hooks";

export default () => {

    const protocolHooks = useProtocolViewHooks();
    let protocol = protocolHooks.protocol;

    if (protocol == null) {
        return <></>
    } else {
        return (
            <>
                <TwoColContactUsWithIllustration
                    image={protocol.logo}
                    subheading={protocol.primitives.join(", ")}
                    heading={<span tw="text-primary-500">{protocol.name}</span>}
                    description={""}
                />
            </>
        )
    }

};