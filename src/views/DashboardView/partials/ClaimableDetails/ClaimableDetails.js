import React from 'react';
import swal from 'sweetalert'
import DollarLabel from "../../../../components/Label/DollarLabel";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import tw from "twin.macro";
import AssetTable from "../../../../components/AssetTable/AssetTable";
import {useClaims} from "../../../../hooks/useClaims";
import useWeb3 from "../../../../hooks/web3";

const Container = tw.div`w-full`
const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-green-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`

const PullRight = tw.div`flex flex-col grid justify-items-end`

const Center = tw.div`grid w-full justify-items-center mb-4 border p-4 rounded-lg`
const Section = tw.div`w-full bg-white`
const Hidden = tw.span`hidden lg:block`


function claimingFunction(claimHook, claimable) {

    const claim = async (e) => {
        e.stopPropagation();
        try {
            const result = await claimHook.claim(claimable);
            result.wait().then((receipt) => {
                swal({
                    text: "Your rewards were successfully claimed",
                    icon: "success"
                });
            }).catch((err) => {
                swal({
                    text: err.message,
                    icon: "error"
                })
            })
        } catch (err) {
            swal({
                text: err.message,
                icon: "error"
            })
        }
    };
    return claim;
}

function ClaimButton({claimable, }) {
    const web3 = useWeb3();
    const claim = useClaims(web3)
    const claimFn = claimingFunction(claim, claimable);

    return (
        <PrimaryButton onClick={claimFn} label="Claim"/>
    );
}

export default function ClaimableDetails({dashboardHooks, showPlaceholder = false}) {
    const claimables = dashboardHooks.claimables;

    if(claimables.length === 0 && !showPlaceholder) {
        return <></>
    }

    const assetEntries = claimables.map(element => {
        return {
            symbol: element.token.symbol,
            detailUrl: `#`,
            name: element.name,
            amount: element.amount,
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.dollarValue,
            actionButton: (
                <ClaimButton claimHook={dashboardHooks.claimHook} claimable={element}/>
            )
        }
    })


    return (
        <Center>
            <Section>
                <Container>

                    <AssetTable
                        showPlaceholder={showPlaceholder}
                        entries={assetEntries}
                        header={
                            <Header>
                                <HeaderTextContainer>
                                    <HeaderText>CLAIMABLE</HeaderText>
                                </HeaderTextContainer>
                                <BalanceText>
                                    <Hidden>
                                        <PullRight>
                                            <HeaderText>
                                                <DollarLabel
                                                    amount={dashboardHooks.totalClaimables}/>
                                            </HeaderText>
                                        </PullRight>
                                    </Hidden>
                                </BalanceText>
                            </Header>
                        }
                    />
                </Container>
            </Section>
        </Center>
    );
};