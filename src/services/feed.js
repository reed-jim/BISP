import axios from "axios"

const apiUrl = 'http://localhost:8080/';

class FeedService {
    add = (data) => {
        axios.post(apiUrl + `feed/add`, data)
    }

    update = (data) => {
        axios.post(apiUrl + `feed/update`, data)
    }

    get = (userId = null, sort = null) => {
        let queryStr = "";

        if (userId != null || sort != null) queryStr += "?";
        if (userId != null) queryStr += `user=${userId}`;
        if (sort != null) queryStr += `&sort=${sort}`;

        return axios.get(apiUrl + `feed${queryStr}`)
    }

    sortInRange = (sort, page) => {
        return axios.get(apiUrl + `feed?sort=${sort}&page=${page}`)
    }

    lastId = () => {
        return axios.get(apiUrl + `lastIndex?collection=feed`)
    }
}

export {
    FeedService
}
