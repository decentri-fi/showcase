import IdeaIconImage from "../../images/idea-svgrepo-com.svg";

export class SuggestionMapper {
    map(suggestion) {
        if (suggestion.type === 'POOL_TO_FARM') {
            const metadata = suggestion.metadata
            return {
                imageSrc: IdeaIconImage,
                title: "Pool to Farm",
                description: `You can put your ${metadata.position} position into ${metadata.farmProtocol}'s ${metadata.farmName} to start earning additional yield.`
            }
        } else {
            return null
        }
    }
}