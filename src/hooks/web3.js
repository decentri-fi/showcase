import {useWeb3React} from "@web3-react/core";
import {InjectedConnector} from "@web3-react/injected-connector";
import {useEffect, useState} from "react";
import swal from "sweetalert";

export function useActiveWeb3React() {
    return useWeb3React('NETWORK')
}

export default function useWeb3() {

    const web3React = useActiveWeb3React();

    const {ethereum} = window

    const [account, setAccount] = useState(null);

    const isOnCorrectChain = (chainId) => {
        return chainId === web3React.chainId;
    }

    async function populateAccount() {
        if (web3React.active && account == null) {
            setAccount(web3React.account);
            onAccountChange((acc) => {
                if (acc !== undefined && acc.length > 0) {
                    setAccount(acc[0]);
                }
            });
        }
    }

    useEffect(() => {
        populateAccount();
    })

    useEffect(() => {
        async function fetchData() {
            const authorized = await injected.isAuthorized()
            if (authorized) {
                await login()
            }
        }

        fetchData()
    }, []);

    const supported = function () {
        return window.ethereum !== undefined
    };

    const login = async () => {
        try {
            let inj = injected;
            if ((await inj.isAuthorized()) !== true) {
                await web3React.activate(inj, (err) => {
                    console.log(err)
                }, true)
                populateAccount();
            } else {
                await web3React.activate(inj, (err) => {
                    console.log(err)
                }, true)
                populateAccount();
            }
        } catch (ex) {
            console.error(ex)
        }
    };

    const onAccountChange = (f) => {
        if (ethereum !== undefined) {
            ethereum.on('accountsChanged', f);
        }
    }

    const onChainChanged = (f) => {
        if (ethereum !== undefined) {
            ethereum.on('chainChanged', f)
        }
    }

    const onConnect = (f) => {
        if (ethereum !== undefined) {
            ethereum.on('connect', f);
        }
    }

    return {
        onChainChanged: onChainChanged,
        onAccountChange: onAccountChange,
        onConnect: onConnect,
        ethereum: ethereum,
        login: login,
        isOnCorrectChain: isOnCorrectChain,
        hasAccount: () =>  account != null,
        active: web3React.active,
        injected: injected,
        supported: supported(),
        web3React: web3React,
        account: account,
    }
};

export const injected = new InjectedConnector({})