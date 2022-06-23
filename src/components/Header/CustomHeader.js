import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header, {DesktopNavLinks, LogoLink, NavLink, NavLinks, NavToggle} from "../headers/light.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import useWeb3 from "../../hooks/web3";
import {Button} from "@mui/material";
import makeBlockie from "ethereum-blockies-base64";
import {useHistory} from "react-router-dom";

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
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url("https://media.istockphoto.com/vectors/abstract-background-of-halftone-dots-and-curved-lines-vector-id1250331164?k=20&m=1250331164&s=612x612&w=0&h=qMsTBJQZ2Kne-2CoZaRvLRSUxpElEG1plEb_YvnxCso=");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-500 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

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

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
  padding-bottom: 56.25% !important;
  padding-top: 0px !important;
  ${tw`rounded`}
  iframe {
    ${tw`rounded bg-black shadow-xl`}
  }
`;

function UserLink({web3}) {

    const sliceAccount = function (address) {
        return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
    };

    const login = async () => {
        await web3.login()
    }

    if (web3.account != null) {
        return (
            <>
                <Button color={"secondary"} variant={"contained"}>
                    <img alt="profil" src={makeBlockie(web3.account)}
                         tw="mx-auto object-cover rounded-full h-10 w-10 mr-4 "/>
                    {sliceAccount(web3.account)}
                </Button>
            </>
        );
    } else {
        return (
            <Button variant={"contained"} color={"secondary"} onClick={login}>
                Connect Wallet
            </Button>
        );
    }
}

function Expansion({expanded}) {
    return expanded ?
        <TwoColumn>
            <LeftColumn>
                <Notification>Discover. Research. Invest.</Notification>
                <Heading>
                    <span>Your gateway to</span>
                    <br/>
                    <SlantedBackground>Decentralized</SlantedBackground><br />
                    Finance
                </Heading>
            </LeftColumn>
            <RightColumn>
            </RightColumn>
        </TwoColumn>
        : <></>
}

export default function CustomHeader({expanded = false, showUserLink = true}) {

    const web3 = useWeb3();
    const history = useHistory();

    const navLinks = [
        <NavLinks key={1}>
            <NavLink onClick={e => {
                history.push('/dashboard');
            }}>
                Showcase
            </NavLink>
            <NavLink onClick={e => {
                history.push('/protocols');
            }}>
                Protocols
            </NavLink>
            <NavLink target="_blank" href="https://decentri.fi?ref=defitrack.io">
                Jobs
            </NavLink>
            <NavLink target="_blank" href="https://docs.defitrack.io">
                Documentation
            </NavLink>
            <NavLink target="_blank" href="https://blockwiz.org">
                Blog
            </NavLink>
        </NavLinks>,
    ];

    const userLink = showUserLink ? <UserLink web3={web3}/> : <></>

    const userLinks = [
        <NavLinks key={2}>
            {userLink}
        </NavLinks>
    ]

    return (
        <Container>
            <OpacityOverlay/>
            <HeroContainer>
                <StyledHeader links={navLinks.concat(userLinks)}/>
                <Expansion expanded={expanded}/>
            </HeroContainer>
        </Container>
    );
}
