import IdeaIconImage from "../../images/idea-svgrepo-com.svg";

export class SuggestionMapper {
    map(suggestion) {
        if (suggestion.type === 'POOL_TO_FARM') {
            const metadata = suggestion.metadata
            return {
                imageSrc: IdeaIconImage,
                title: "Pool to Farm",
                description: `You can put your ${metadata.poolName} position into ${metadata.farmProtocol}'s ${metadata.farmName} to start earning additional yield.`
            }
        } else if(suggestion.type === 'EXPIRED_FARM') {
            const metadata = suggestion.metadata
            return {
                imageSrc: IdeaIconImage,
                title: "Expired Farm",
                description: `You've invested in ${metadata.farmProtocol}'s ${metadata.farmName}. The farm has expired. Claim rewards and exit the farm.`
            }
        } {
            return null
        }
    }
}