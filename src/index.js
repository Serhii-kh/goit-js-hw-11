import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
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
  const fetchImages = async inputRefValue => {
    return await instance.get(
      `?key=${API_KEY}&q=${inputRefValue}&${BASE_FETCH_OPTIONS}`
    );
  };
  console.log(inputRefValue);

  fetchImages().then(({ data }) => {
    console.log(data);
  });
}

function renderImgCard(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <img src=${webformatURL}  alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  galleryRef.innerHTML = markup;
}

// ?key=${API_KEY}&q=${inputRefValue}&${BASE_FETCH_OPTIONS}

// ?key=34855628-78991e6cca5fe0310616aeb58&

// Notiflix.Notify.failure(
//   "We're sorry, but you've reached the end of search results."
// );

// В ответе будет массив изображений.Каждое изображение:

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

{
  /* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */
}
