import axios from 'axios';

export class FetchImgService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages = async () => {
    console.log(this);
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34855628-78991e6cca5fe0310616aeb58';
    const BASE_FETCH_OPTIONS =
      'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

    const instance = axios.create({
      baseURL: BASE_URL,
    });

    const res = await instance.get(
      `?key=${API_KEY}&q=${this.searchQuery}&${BASE_FETCH_OPTIONS}&page=${this.page}`
    );

    this.incrementPage();
    return res;
  };

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
