import axios from "axios"



const apiUrl = 'http://127.0.0.1:3001/';

const addFeed = (data) => {
    axios.post(apiUrl + 'add-feed', data)
}

const getFeed = () => {
    return axios.get(apiUrl + 'feed')
}

export { addFeed, getFeed }
