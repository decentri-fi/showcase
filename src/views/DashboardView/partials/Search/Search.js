import {useHistory} from "react-router-dom";
import ReactGA from "react-ga4";
import React from "react";

import tw from "twin.macro";

const SearchContainer = tw.div`pt-2 w-full relative max-w-screen-xl text-gray-600 lg:mb-8 lg:mt-4 grid mb-4`;
const SearchInput = tw.input`w-11/12 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`
const SearchButtonContainer = tw.div`w-1/12 grid flex`
const SearchButtonIcon  = tw.svg`justify-self-end text-gray-600 h-4 w-4 fill-current`;
const SearchButton = tw.button`grid w-1/12 absolute right-0 top-0 mt-5`

export default function Search({dashboardHooks, searchPlaceholder = "Search an address"}) {
    const history = useHistory()

    const search = function (e) {
        dashboardHooks.setSearchAddress(e.target.value)
    }

    return (
            <SearchContainer>
                <SearchInput
                    onChange={search}
                    type="search" name="search" placeholder={searchPlaceholder}/>
                <SearchButtonContainer>
                    <SearchButton onClick={e => {
                        if (dashboardHooks.searchAddress !== null && dashboardHooks.searchAddress !== undefined && (dashboardHooks.searchAddress.length === 40 || dashboardHooks.searchAddress.length === 42)) {
                            ReactGA.event({
                                category: 'dashboard',
                                action: 'Search',
                                value: dashboardHooks.searchAddress
                            });
                            history.push('/account/' + dashboardHooks.searchAddress);
                        }
                    }} type="submit">
                        <SearchButtonIcon xmlns="http://www.w3.org/2000/svg"
                             id="Capa_1" x="0px" y="0px"
                             viewBox="0 0 56.966 56.966"
                             width="512px" height="512px">
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                        </SearchButtonIcon>
                    </SearchButton>
                </SearchButtonContainer>
            </SearchContainer>
    )
}