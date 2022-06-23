import React from 'react';
import TwoColContactUsWithIllustration from "../../components/forms/TwoColContactUsWithIllustration";
import useProtocolViewHooks from "./hooks/protocolview-hooks";
import PoolingOpportunities from "../../components/PoolingOpportunities/PoolingOpportunities";
import LendingOpportunities from "../../components/LendingOpportunities/LendingOpportunities";
import FarmingOpportunities from "../../components/FarmingOpportunities/FarmingOpportunities";
import tw from "twin.macro";

const Center = tw.div`grid justify-items-center w-full`
const Container = tw.div`w-full lg:w-1/2`

export default () => {

    const protocolHooks = useProtocolViewHooks();
    let protocol = protocolHooks.protocol;

    if (protocol == null) {
        return <></>
    } else {
        return (
            <>
                <Center>
                    <Container>
                        <TwoColContactUsWithIllustration
                            image={protocol.logo}
                            subheading={protocol.primitives.join(", ")}
                            heading={<span tw="text-primary-500">{protocol.name}</span>}
                            description={""}
                        />
                    </Container>
                </Center>

                <FarmingOpportunities farmingOpportunities={protocolHooks.farmingOpportunities}></FarmingOpportunities>

                <PoolingOpportunities poolingOpportunities={
                    protocolHooks.poolingOpportunities
                } title={"Pooling Opportunities"}></PoolingOpportunities>

                <LendingOpportunities lendingOpportunities={protocolHooks.lendingOpportunities}></LendingOpportunities>
            </>
        )
    }

};