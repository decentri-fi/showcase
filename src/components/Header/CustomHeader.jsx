import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header, {DesktopNavLinks, LogoLink, NavLink, NavLinks, NavToggle} from "../headers/light.jsx";
import {useHistory} from "react-router-dom";
import LandingMockup from "../../images/landing/landing_mockup.png";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none lg:mt-8 pb-4`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }

  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mt-8 bg-center bg-cover`}
  background-image: url("https://media.istockphoto.com/vectors/abstract-background-of-halftone-dots-and-curved-lines-vector-id1250331164?k=20&m=1250331164&s=612x612&w=0&h=qMsTBJQZ2Kne-2CoZaRvLRSUxpElEG1plEb_YvnxCso=");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-500 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`lg:pt-24 lg:pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block lg:w-1/2 w-full lg:pr-24`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;


const SearchHolder = tw.div`flex justify-between items-center flex-col lg:flex-row`;

const SearchContainer = tw.div`flex w-full border-2 focus-within:border-2 focus-within:border-blue-400 border-purple-200 relative max-w-screen-xl text-gray-600 mb-4`;
const SearchInput = tw.input`bg-transparent  w-11/12 h-10 px-5 text-sm focus:outline-none`
const Caret = tw.div`flex items-center align-middle w-1/12`
const OrText = tw.div`text-white my-4 text-xl text-center lg:text-left font-black text-gray-100 leading-none`
const SearchTeaser = tw.div`w-full`

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-500 font-medium text-sm`;

function Expansion({expanded}) {

    return expanded ?
        <TwoColumn>
            <LeftColumn>
                <Heading>
                    <span>The easiest way</span>
                    <br/>
                    <SlantedBackground>to integrate DeFi</SlantedBackground><br/>
                </Heading>
                <Notification>Discover. Research. Implement.</Notification>
            </LeftColumn>
            <RightColumn>
                <img src={LandingMockup} alt={"Landing Mockup"}/>
            </RightColumn>
        </TwoColumn>
        : <></>
}

export default function CustomHeader({expanded = false}) {

    const history = useHistory();

    const navLinks = [
        <NavLinks key={1}>
            <NavLink target="_blank" href="https://track.decentri.fi/explore">
                Explore
            </NavLink>
            <NavLink target="_blank" href="https://track.decentri.fi">
                Decentrifi Portfolio
            </NavLink>
            <NavLink target="_blank" href="https://track.decentri.fi/protocols">
                Protocols
            </NavLink>
            <NavLink target="_blank" href="https://docs.decentri.fi">
                API
            </NavLink>
            <NavLink target="_blank" href="https://learn.decentri.fi">
                Learn
            </NavLink>
        </NavLinks>,
    ];

    return (
        <Container>
            <OpacityOverlay/>
            <HeroContainer>
                <StyledHeader links={navLinks}/>
                <Expansion expanded={expanded}/>
            </HeroContainer>
        </Container>
    );
}
