import axios from "axios"
import { apiUrl } from "./config"

class CollectionResult {
    add = (data) => {
        return axios.post(apiUrl + `collectionResult/add`, data)
    }
    
    updates = (userId, collectionId) => {
        return axios.get(apiUrl + `collectionResult?user=${userId}&collection=${collectionId}`)
    }
    
    get = (userId, collectionId) => {
        return axios.get(apiUrl + `collectionResult?user=${userId}&collection=${collectionId}`)
    }

    lastId = () => {
        return axios.get(apiUrl + `lastIndex?collection=collectionResult`)
    }
}

export {
    CollectionResult
}
