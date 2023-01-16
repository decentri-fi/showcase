import {useWeb3React} from "@web3-react/core";

import {useEffect, useState} from "react";
import {hooks as metamaskHooks, metaMask} from "./metamask";

export default function useWeb3() {

    const web3React = useWeb3React()

    const {ethereum} = window

    const isOnCorrectChain = (chainId) => {
        return chainId === web3React.chainId;
    }

    useEffect(() => {

        async function fetchData() {
            //    await login();
        }

        fetchData()
    }, []);

    const supported = function () {
        return window.ethereum !== undefined
    };

    const connect = async () => {
        await metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask')
        })
    }

    const login = async () => {
        try {
            if (window.ethereum.isMetaMask) {
                console.log('logging in');
                await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                await metaMask.connectEagerly().catch(() => {
                    console.debug('Failed to connect eagerly to metamask')
                })
            }
        } catch (ex) {
            console.error(ex)
        }
    };

    return {
        ethereum: ethereum,
        login: login,
        autoConnect: connect,
        isOnCorrectChain: isOnCorrectChain,
        hasAccount: metamaskHooks.useAccount()?.length > 0,
        active: metamaskHooks.useIsActive(),
        supported: supported(),
        web3React: web3React,
        account: metamaskHooks.useAccount(),
    }
};