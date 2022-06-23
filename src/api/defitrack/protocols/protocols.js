import defitrack from '@defitrack/js-client'

export const fetchProtocols = async () => {
    return await defitrack.protocols().list()
}