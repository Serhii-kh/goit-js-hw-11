import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
// const inputRef = document.querySelector('searchQuery');
const API_KEY = '34855628-78991e6cca5fe0310616aeb58';
const BASE_URL = 'https://pixabay.com/api/';
const BASE_FETCH_OPTIONS =
  'image_type=photo&orientation=horizontal&safesearch=true';

const instance = axios.create({
  baseURL: BASE_URL,
});

formRef.addEventListener('submit', onFormSubmit);

console.log(formRef);
console.log(formRef.elements.searchQuery);

function onFormSubmit(e) {
  e.preventDefault();

  const inputRefValue = e.currentTarget.elements.searchQuery.value;

  console.log(inputRefValue);

  const fetchImages = async () => {
    return await instance.get(
      `?key=${API_KEY}&q=${inputRefValue}&${BASE_FETCH_OPTIONS}`
    );
  };

  fetchImages().then(({ data }) => {
    console.log(data);
  });
}

// Notiflix.Notify.info(
//   "We're sorry, but you've reached the end of search results."
// );
