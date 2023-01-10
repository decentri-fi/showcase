import React from "react";
import tw from "twin.macro"

const Container = tw.div`flex mb-2`
const Border = tw.div`shadow-md hover:shadow-lg  w-full p-2 bg-white dark:bg-gray-800`
const Center = tw.div`flex items-center`

const Title = tw.p`text-sm text-gray-800 dark:text-gray-100`
const BoldText = tw.p`text-gray-800 text-sm dark:text-white font-bold`
const Icon = tw.div`mr-2`
const PullRight = tw.div`flex grid justify-items-end text-right`

export default function DetailCard({centerHtml, title, icon, bottomHtml = <></>}) {
    return (
        <Container>
            <Border>
                <Center>
                    <Icon>
                        {icon}
                    </Icon>
                    <div tw="flex w-2/3">
                        <Title>
                            {title}
                        </Title>

                    </div>
                    <div tw="w-1/3">
                        <PullRight>
                            <div>
                                <BoldText>
                                    {centerHtml}
                                </BoldText>
                            </div>
                        </PullRight>
                    </div>
                </Center>
                {bottomHtml}
            </Border>
        </Container>
    )
};