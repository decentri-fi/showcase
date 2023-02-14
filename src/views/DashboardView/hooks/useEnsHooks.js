import {useEffect, useState} from "react";
import {getEns, getReverseEns} from "../../../api/defitrack/ens/ens";

export default function useEnsHooks(account) {

    const [ens, setEns] = useState(null)

    useEffect(() => {
        if (account != null) {
            getReverseEns(account).then(ens => {
                setEns(ens.name)
            }).catch(ex => {
                console.log("error trying to fetch ens", ex)
            })
        }
    }, [account]);


    return {
        ens
    }
};