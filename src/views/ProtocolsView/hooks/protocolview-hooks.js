import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";

export default function useProtocolView() {

    const params = useParams();

    const protocolSlug = params.protocol;

    const [protocol, setProtocol] = useState(null)

    useEffect(async() => {

        const protocols = await fetchProtocols();
        const proto = protocols.find(element => element.slug === protocolSlug)
        if (proto !== undefined) {
            setProtocol(proto)
        }

    }, [params])

    return {
        protocol
    }
}