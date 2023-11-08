import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {SectionHeading} from "../../components/misc/Headings.js";

import defaultCardImage from "../../images/shield-icon.svg";

import SvgDecoratorBlob3 from "../../images/svg-decorator-blob-3.svg?react";
import {SectionDescription} from "../../components/misc/Typography";

import UniPooling from "../../images/unicorns/uni-pooling.png"
import UniFarming from "../../images/unicorns/uni-farmer.png"
import UniBanker from "../../images/unicorns/uni-banker.png"
import UniTokens from "../../images/unicorns/uni-with-tokens.png"

const ImageContainer = tw.div`w-64`

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Description = tw(SectionDescription)`text-center mx-auto mb-5 w-full`;


const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default () => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component):
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const cards = [
    {
      imageSrc: UniPooling,
      title: "Liquidity Pools",
      description: "Uniswap, Balancer, Curve? These pools are used as liquidity for token swaps.",
      url: "https://timerse.com"
    },
    {
      imageSrc: UniFarming,
      title: "Farming Opportunities",
      description: "Any Farm, Token Staking or Yield Opportunity",
      url: "https://google.com"
    },
    {
      imageSrc: UniBanker,
      title: "Lending & Borrowing",
      description: "Borrow vaults? Debt tokens? Compound or Aave? We index it.",
      url: "https://reddit.com"
    },
    {
      imageSrc: UniTokens,
      title: "Tokens",
      description: "Borrow vaults? Debt tokens? Compound or Aave? We index it.",
      url: "https://reddit.com"
    }
  ]

  return (
    <Container>
      <ThreeColumnContainer>
        <Description>We index protocols, aggregate contracts, transform data and present defi native building blocks.</Description>
        <Heading>Your DeFi <span tw="text-primary-500">Building Blocks</span></Heading>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <ImageContainer>
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </ImageContainer>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
