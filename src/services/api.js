import axios from "axios";

//Base: https://api.themoviedb.org/3/
//URL exemplo: movie/11?api_key=7d0b693249324c57a076401d872add36

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;