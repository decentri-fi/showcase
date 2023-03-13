import {getSigner} from "./withContract";

export const useClaims = (web3) => {

    const initiateClaim = async (claimable) => {
        if (claimable.network.chainId !== web3.web3React.chainId) {
            try {
                await web3.changeNetwork(claimable.network.chainId);
            } catch (err) {
                if (err.code === 4902) {
                    throw new Error("Failed to change network, please add it manually");
                    /*    await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainName: 'Polygon Mainnet',
                                    chainId: web3.utils.toHex(chainId),
                                    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                                    rpcUrls: ['https://polygon-rpc.com/']
                                }
                            ]
                        }); *  */
                } else {
                    console.log(err);
                }
            }
        } else {
            if (claimable.claimTransaction.from == null || claimable.claimTransaction.from.toLowerCase() == web3.account.toLowerCase()) {
                return await getSigner(web3.web3React.provider, web3.account).sendTransaction(
                    {
                        to: claimable.claimTransaction.to,
                        data: claimable.claimTransaction.data
                    }
                )
            } else {
                throw new Error("You are not able to perform this transaction for this claimable");
            }
        }
    }

    return {
        claim: initiateClaim
    }
}