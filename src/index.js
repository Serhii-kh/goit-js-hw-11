import axios from 'axios';
import Notiflix from 'notiflix';
import { FetchImgService } from './js/fetch-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more');

const fetchImgService = new FetchImgService();

formRef.addEventListener('submit', onFormSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();

  clearImagesDiv();
  fetchImgService.query = e.currentTarget.elements.searchQuery.value;
  fetchImgService.resetPage();

  await fetchImgService
    .fetchImages()
    .then(({ data }) => {
      if (data.hits.length === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      return data.hits;
    })
    .then(renderImgCards)
    .catch(error => console.log(error));
}

async function onLoadMoreBtnClick() {
  await fetchImgService
    .fetchImages()
    .then(({ data }) => data.hits)
    .then(renderImgCards)
    .catch(error => {
      console.log(error);
    });
}

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

  galleryRef.insertAdjacentHTML('beforeend', markup);
}
function clearImagesDiv() {
  galleryRef.innerHTML = '';
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
