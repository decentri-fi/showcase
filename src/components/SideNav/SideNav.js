import React from 'react';
import {useHistory} from "react-router-dom";

import makeBlockie from 'ethereum-blockies-base64';
import useWeb3, {useActiveWeb3React} from "../../hooks/web3";
import getChain from "../../constants/chains";


export default function SideNav() {
    return (
        <nav
            className="mb-24 bg-black top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                       href="../index.html">Notus JS</a>
                    <button
                        className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button" onClick="toggleNavbar('example-collapse-navbar')">
                        <i className="text-white fas fa-bars"></i>
                    </button>
                </div>
                <div className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden"
                     id="example-collapse-navbar">
                    <ul className="flex flex-col lg:flex-row list-none mr-auto">
                        <li className="flex items-center">
                            <a className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                               href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus?ref=njs-profile&amp;_ga=2.62988906.456328349.1637254118-188818245.1637254118"><i
                                className="lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2"></i>
                                Docs</a>
                        </li>
                    </ul>
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
                        <li className="inline-block relative">
                            <a className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                               href="#pablo" onClick="openDropdown(event,'demo-pages-dropdown')">
                                Demo Pages
                            </a>
                            <div
                                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                id="demo-pages-dropdown">
                <span
                    className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400">
                  Admin Layout
                </span>
                                <a href="./admin/dashboard.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Dashboard
                                </a>
                                <a href="./admin/settings.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Settings
                                </a>
                                <a href="./admin/tables.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Tables
                                </a>
                                <a href="./admin/maps.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Maps
                                </a>
                                <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100"></div>
                                <span
                                    className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400">
                  Auth Layout
                </span>
                                <a href="./auth/login.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Login
                                </a>
                                <a href="./auth/register.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Register
                                </a>
                                <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100"></div>
                                <span
                                    className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400">
                  No Layout
                </span>
                                <a href="./landing.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Landing
                                </a>
                                <a href="./profile.html"
                                   className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                    Profile
                                </a>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <a className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                               href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-js%2F"
                               target="_blank"><i
                                className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg"></i><span
                                className="lg:hidden inline-block ml-2">Share</span></a>
                        </li>
                        <li className="flex items-center">
                            <a className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                               href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-js%2F&amp;text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20JavaScript%20UI%20Kit%20and%20Admin.%20Let%20Notus%20JS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
                               target="_blank"><i
                                className="lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg"></i><span
                                className="lg:hidden inline-block ml-2">Tweet</span></a>
                        </li>
                        <li className="flex items-center">
                            <a className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                               href="https://github.com/creativetimofficial/notus-js?ref=njs-profile" target="_blank"><i
                                className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg"></i><span
                                className="lg:hidden inline-block ml-2">Star</span></a>
                        </li>
                        <li className="flex items-center">
                            <a className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                               href="https://www.creative-tim.com/product/notus-js?ref=njs-index" target="_blank">
                                <i className="fas fa-arrow-alt-circle-down"></i> Download
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export function SideNav2({activeTab = "DASHBOARD"}) {

    const web3 = useWeb3()
    const activeWeb3 = useActiveWeb3React()

    const isActive = () => {
        return web3.web3React.active
    }

    function formattedAccount() {
        let address = activeWeb3.account;
        return address.slice(0, 5) + "..." + address.slice(address.length - 5, address.length)
    }

    function smallTabCss(tabName) {
        if (tabName === activeTab) {
            return "text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        } else {
            return "text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        }
    }

    function fullTabCss(tabName) {
        if (tabName === activeTab) {
            return "w-full font-thin uppercase text-blue-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-blue-500"
        } else {
            return "w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
        }
    }

    function getChainName() {
        return getChain(activeWeb3.chainId).name
    }

    function WalletFragment() {
        if (!isActive()) {
            return (
                <div className="m-4 mt-12">
                    <h4 className="font-xl">No wallet connect yet.</h4>
                    <p>Please connect your wallet to manage your assets.</p>
                </div>
            );
        } else {
            return <>
                <div className="m-4 mt-12">
                    <div
                        className="shadow-lg rounded-xl w-full md:w-72 p-4 bg-white dark:bg-gray-800 relative overflow-hidden">
                        <div className="w-full block">
                            <div className="w-full flex items-center">
                                <a href="#" className="block relative">
                                    <img alt="profil" src={makeBlockie(activeWeb3.account)}
                                         className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                </a>
                                <div className="flex flex-col items-center ml-2">
                <span className="dark:text-white">
                    {formattedAccount()}
                </span>
                                    <span className="text-gray-400 text-sm dark:text-gray-300">
                    {getChainName()}
                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
    }


    const history = useHistory();

    return (
        <>
            <div className="w-full">
                <div>
                    <nav className="bg-white dark:bg-gray-800  ">
                        <div className="max-w-7xl mx-auto px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center mx-auto">
                                    <div className="block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            <a className={smallTabCss('DASHBOARD')}
                                               onClick={(event) => {
                                                   history.push("/dashboard")
                                               }}>
                                                Dashboard
                                            </a>
                                            <a className={smallTabCss('DOCS')}
                                               onClick={(event) => {
                                                   history.push("https://docs.defitrack.io")
                                               }}>
                                                Docs
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
};