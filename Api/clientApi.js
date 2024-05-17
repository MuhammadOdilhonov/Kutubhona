import axios from "axios";

export const BaseUrl = "https://6646181a51e227f23aadc112.mockapi.io/book/BookSeries/";


const client = axios.create({
    baseURL: BaseUrl,
});

export default client;