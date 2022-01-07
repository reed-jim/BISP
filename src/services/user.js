import axios from "axios"
import { apiUrl } from "./config"

class UserService {
    add = (data) => {
        axios.post(apiUrl + `user/add`, data)
    }

    update = (data) => {
        axios.post(apiUrl + `user/update`, data)
    }

    get = (userId, collectionId) => {
        return axios.get(apiUrl + `user?user=${userId}&collection=${collectionId}`)
    }

    lastId = () => {
        return axios.get(apiUrl + `lastIndex?collection=user`)
    }

    isExist = (key) => {
        return axios.post(apiUrl + `user/isExist`, { key: key })
    }

    getFriendList = (friendIdList) => {
        return axios.post(apiUrl + `user/friends`, friendIdList)
    }
}

export {
    UserService
}
