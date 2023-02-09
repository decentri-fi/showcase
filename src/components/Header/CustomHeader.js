import React, {useRef, useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header, {DesktopNavLinks, LogoLink, NavLink, NavLinks, NavToggle} from "../headers/light.js";
import useWeb3 from "../../hooks/web3";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
import Search from "../../views/DashboardView/partials/Search/Search";
import ReactGA from "react-ga4";
import useConnectWalletPopup from "../ConnectWalletPopup/UseConnectWalletPopup";
import {PrimaryButton} from "../misc/Buttons";

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


const SearchHolder = tw.div`px-4 flex justify-between items-center flex-col lg:flex-row`;

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

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

function UserLink({web3}) {

    const {
        html: connectWalletPopup,
        open: openConnectWalletPopup,
    } = useConnectWalletPopup();

    const sliceAccount = function (address) {
        return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
    };


    if (web3.account != null) {
        return (
            <>
                <Button color={"secondary"} variant={"contained"}>
                    {sliceAccount(web3.account)}
                </Button>
            </>
        );
    } else {
        return (
            <>
                <Button variant={"contained"} color={"secondary"} onClick={openConnectWalletPopup}>
                    Connect Wallet
                </Button>
                {connectWalletPopup}
            </>
        );
    }
}

function Expansion({expanded}) {

    const searchField = useRef(null);

    const history = useHistory();

    return expanded ?
        <TwoColumn>
            <LeftColumn>
                <Notification>Discover. Research. Invest.</Notification>
                <SearchTeaser>
                    <SearchContainer>
                        <SearchInput
                            onSubmit={e => {
                                if (searchField.length === 40 || searchField.length === 42) {
                                    ReactGA.event({
                                        category: 'dashboard',
                                        action: 'Search',
                                        value: searchField
                                    });
                                    history.push(`/${searchField}/profile`);
                                }
                            }}
                            type="search" name="search" placeholder={'Track your wallet address or ENS'}></SearchInput>
                        <Caret>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="none"></rect>
                                <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor"
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></polyline>
                            </svg>
                        </Caret>
                    </SearchContainer>
                    <OrText>or</OrText>
                    <PrimaryButton  onClick={() => {
                        history.push('/dashboard');
                    }
                    }>Login with Web3</PrimaryButton>
                </SearchTeaser>
            </LeftColumn>
            <RightColumn>
                <Heading>
                    <span>Break down and manage your</span>
                    <br/>
                    <SlantedBackground>Decentralized Finance</SlantedBackground><br/>
                    Portfolio

                </Heading>
            </RightColumn>
        </TwoColumn>
        : <></>
}

export default function CustomHeader({onAddressChange, expanded = false, showUserLink = true, showSearch = false}) {

    const web3 = useWeb3();
    const history = useHistory();

    const navLinks = [
        <NavLinks key={1}>
            <NavLink onClick={e => {
                history.push('/dashboard');
            }}>
                Dashboard
            </NavLink>
            <NavLink onClick={e => {
                history.push('/protocols');
            }}>
                Protocols
            </NavLink>
            <NavLink target="_blank" href="https://jobs.decentri.fi">
                Jobs
            </NavLink>
            <NavLink target="_blank" href="https://docs.decentri.fi">
                Documentation
            </NavLink>
            <NavLink target="_blank" href="https://learn.decentri.fi">
                Learn
            </NavLink>
        </NavLinks>,
    ];

    const userLink = showUserLink ? <UserLink web3={web3}/> : <></>

    const userLinks = [
        <NavLinks key={2}>
            {userLink}
        </NavLinks>
    ]

    const search = () => {
        if (showSearch) {
            return (
                <SearchHolder>
                    <LeftColumn></LeftColumn>
                    <RightColumn>
                        <Search onAddressChange={onAddressChange}></Search>
                    </RightColumn>
                </SearchHolder>
            )
        } else {
            return <></>;
        }
    }


    return (
        <Container>
            <OpacityOverlay/>
            <HeroContainer>
                <StyledHeader links={navLinks.concat(userLinks)}/>
                {search()}
                <Expansion expanded={expanded}/>
            </HeroContainer>
        </Container>
    );
}
