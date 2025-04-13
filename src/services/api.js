import axios from 'axios';

const API_KEY = '70Pa9QmjMm5Wq9zL7SQcHaEHnqWu-sd94C6D30OS3Xs';
const API_URL = 'https://api.unsplash.com/search/photos';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${API_KEY}`
  }
});

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await unsplashApi.get('/search/photos', {
    params: {
      query,
      page,
      per_page: perPage
    }
  });
  
  return response.data;
};