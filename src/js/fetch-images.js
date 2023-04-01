import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34855628-78991e6cca5fe0310616aeb58';
const BASE_FETCH_OPTIONS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=6';

export class FetchImgService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages = async () => {
    const instance = axios.create({
      baseURL: BASE_URL,
    });

    const response = await instance.get(
      `?key=${API_KEY}&q=${this.searchQuery}&${BASE_FETCH_OPTIONS}&page=${this.page}`
    );

    this.incrementPage();
    console.log(response);
    console.log(response.data.totalHits);
    return response;
  };

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
