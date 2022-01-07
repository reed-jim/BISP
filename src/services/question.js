import axios from "axios"
import { apiUrl } from "./config"

const addQuestionCollection = (data) => {
    axios.post(apiUrl + 'question-collection/add', data)
}

const addQuestion = (data) => {
    axios.post(apiUrl + 'question-collection/question/add', data)
}

const getLastCollectionId = () => {
    return axios.get(apiUrl + "lastIndex?collection=questionCollection")
}

const getLastQuestionId = () => {
    return axios.get(apiUrl + "lastIndex?collection=question")
}

const updateQuestionCollection = (id, data) => {
    axios.post(apiUrl + `question-collection/${id}/update`, Object.assign(id, data))
}

const getQuestionCollections = (start, end) => {
    // question-collection?start=0&end=18&sort=new
    return axios.get(apiUrl + `question-collection?start=${start}&end=${end}`)
}

const getQuestions = (collectionId) => {
    return axios.get(apiUrl + `question-collection/question?collection=${collectionId}`)
}

const sortBy = (field) => {
    return axios.get(apiUrl + `question-collection?sort=${field}`)
}

const findByDifficulty = (difficulty) => {
    return axios.get(apiUrl + `question/search?difficulty=${difficulty}`)
}

// const filter = (conditions) => {
//     const query = "";

//     Object.entries(conditions).forEach(([, value], index) => {
//         if (index == 0) {
//             query += `${key}=${value}`
//         }
//         else {
//             query += `&${key}=${value}`
//         }
//     });

//     return axios.get(apiUrl + `question/search?${query}`)
// }

// const findByDifficulty = (difficulty) => {
//     return axios.get(apiUrl + `question/search?difficulty=${difficulty}`)
// }

// const sortBy = (params) => {
//     return axios.get(apiUrl + `question/sort?field=difficulty&limit=8`)
// }

export {
    addQuestionCollection, addQuestion, getLastCollectionId, updateQuestionCollection,
    getQuestionCollections, getQuestions, getLastQuestionId, sortBy
}
