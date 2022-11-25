import {Contract} from '@ethersproject/contracts'

export const withContract = function (address, abi, web3ReactContextInterface) {
    return getContract(address, abi, web3ReactContextInterface.library, web3ReactContextInterface.account)
};

function getContract(address, abi, library, account) {
    return new Contract(
        address, abi, getProviderOrSigner(library, account)
    )
}

export function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library
}

export function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked()
}