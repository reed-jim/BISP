import axios from "axios"

const apiUrl = 'http://127.0.0.1:3001/';

const addQuestionCollection = (data) => {
    axios.post(apiUrl + 'add-question-collection', data)
}

const getQuestionCollection = () => {
    return axios.get(apiUrl + 'question-collection')
}

const addQuestion = (data) => {
    axios.post(apiUrl + 'add-question', data)
}

export { addQuestionCollection, addQuestion }
