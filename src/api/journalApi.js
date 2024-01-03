import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://vue-projects-demos-default-rtdb.firebaseio.com'
})

export default journalApi
