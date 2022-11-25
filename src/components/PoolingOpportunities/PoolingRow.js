import {useHistory} from "react-router-dom";
import FallbackImage from "../Image/FallbackImage";
import DollarLabel from "../Label/DollarLabel";
import APYLabel from "../Label/APYLabel";
import PrimaryButton from "../Button/PrimaryButton";
import React from "react";
import tw from "twin.macro";

const ListContainer = tw.div`flex grid justify-items-center w-full bg-white`
const List = tw.ul`flex flex-col w-full `

const SmallhiddenColumn = tw.td`p-2 hidden lg:block`
const ListItem = tw.li`flex flex-row w-full`
const Row = tw.div`select-none w-full cursor-pointer flex flex-1 items-center px-3 py-2 border-b`
const IconColumn = tw.div`flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `

const NameColumn = tw.div`pl-1 w-1/4 flex-1 font-medium text-blue-600 dark:text-gray-200 text-xs`

const TwoColumns = tw.div`grid grid-cols-2`

const AmountColumn=tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/2 lg:w-1/3`

const TotalColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Hidden = tw.span`hidden lg:block`

export function PoolingRow({poolingElement}) {


    const history = useHistory()

    return (
        <ListItem onClick={() => {
            history.push(`/pooling/${poolingElement.network.name}/${poolingElement.protocol.slug}/${poolingElement.id}`);
        }}>
            <Row>
                <IconColumn>
                    <FallbackImageContainer>
                        <Image>
                            <FallbackImage src={poolingElement.protocol.logo}/>
                        </Image>
                        <OverlayImage>
                            <FallbackImage src={poolingElement.network.logo}/>
                        </OverlayImage>
                    </FallbackImageContainer>
                </IconColumn>
                <NameColumn>
                    {poolingElement.name}
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <Hidden><DollarLabel amount={poolingElement.marketSize}/></Hidden>
                        <div><APYLabel amount={poolingElement.apr * 100}/>%</div>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <PrimaryButton label="+" onClick={() => {
                            history.push(`/pooling/${poolingElement.network.name}/${poolingElement.protocol.slug}/${poolingElement.id}`);
                        }}/>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}
