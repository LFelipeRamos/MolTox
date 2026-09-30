import type { SearchResult } from "../types/SearchResult";

interface CompoundCardProps {
    result: SearchResult
}

function CompoundCard(props:CompoundCardProps) {

    const result = props.result
    
    return(
        <div>
            <h3>{result.title}</h3>
            <span>{result.category}</span>
            <p>{result.description}</p>
            {result.url && (<a href={result.url}>Ver conteúdo</a>)}
        </div>)
}

export default CompoundCard;