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
            /*
            const authorized = await injected.isAuthorized()
            if (authorized) {
                await login()
            }
             */
            await login();
        }

        fetchData()
    }, []);

    const supported = function () {
        return window.ethereum !== undefined
    };

    const login = async () => {
        try {
            await metaMask.connectEagerly().catch(() => {
                console.debug('Failed to connect eagerly to metamask')
            })
        } catch (ex) {
            console.error(ex)
        }
    };

    return {
        ethereum: ethereum,
        login: login,
        isOnCorrectChain: isOnCorrectChain,
        hasAccount: metamaskHooks.useAccount()?.length > 0,
        active: metamaskHooks.useIsActive(),
        supported: supported(),
        web3React: web3React,
        account: metamaskHooks.useAccount(),
    }
};