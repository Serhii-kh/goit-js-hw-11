import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('load-more');
const API_KEY = '34855628-78991e6cca5fe0310616aeb58';
const BASE_URL = 'https://pixabay.com/api/';
const BASE_FETCH_OPTIONS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

const instance = axios.create({
  baseURL: BASE_URL,
});

formRef.addEventListener('submit', onFormSubmit);
// loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();

  const inputRefValue = e.currentTarget.elements.searchQuery.value;
  // const submitBtnRef = e.currentTarget.elements.;
  let page = 2;
  const fetchImages = async () => {
    return await instance.get(
      `?key=${API_KEY}&q=${inputRefValue}&${BASE_FETCH_OPTIONS}&page=${page}`
    );
  };

  await fetchImages()
    .then(({ data }) => {
      if (data.hits.length === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      console.log(data.hits);

      return data.hits;
    })
    .then(renderImgCards)
    .catch(error => console.log(error));
  page += 1;
}

function onLoadMoreBtnClick() {}

function renderImgCards(images) {
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
      <b>Likes - ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views - ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments - ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads - ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  galleryRef.innerHTML = markup;
}

// function onFormSubmit(e) {
//   e.preventDefault();

//   const inputRefValue = e.currentTarget.elements.searchQuery.value;
//   const fetchImages = async () => {
//     return await instance.get(
//       `?key=${API_KEY}&q=${inputRefValue}&${BASE_FETCH_OPTIONS}`
//     );
//   };

//   fetchImages()
//     .then(({ data }) => {
//       if (data.hits.length === 0) {
//         Notiflix.Notify.info(
//           "We're sorry, but you've reached the end of search results."
//         );
//         return;
//       }
//       return data.hits;
//     })
//     .then(renderImgCards)
//     .catch(error => console.log(error));
// }
