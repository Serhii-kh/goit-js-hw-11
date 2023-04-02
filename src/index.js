import axios from 'axios';
import Notiflix from 'notiflix';
import { FetchImgService } from './js/fetch-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import simpleLightbox from 'simplelightbox';

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more');

let startNumberOfImages = 40;

loadMoreBtnRef.classList.add('is-hidden');

const fetchImgService = new FetchImgService();

formRef.addEventListener('submit', onFormSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(e) {
  e.preventDefault();

  clearImagesDiv();
  fetchImgService.searchQuery = e.currentTarget.elements.searchQuery.value;
  fetchImgService.resetPage();

  fetchImgService
    .fetchImages()
    .then(data => {
      if (data.hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (data.hits.length < 40) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else if (fetchImgService.page > 1) {
        Notiflix.Notify.success(
          `Hooray! We found ${fetchImgService.totalHits} images.`
        );
      }

      return data.hits;
    })
    .then(renderImgCards);

  console.log(galleryRef.children.length);
}

function onLoadMoreBtnClick() {
  fetchImgService.fetchImages().then(data => {
    renderImgCards(data.hits);

    startNumberOfImages += data.hits.length;

    if (startNumberOfImages === fetchImgService.totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });

  console.log(galleryRef.children.length);
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
        return `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card">
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
</div></a>`;
      }
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function clearImagesDiv() {
  galleryRef.innerHTML = '';
}

// .then(
//       new SimpleLightbox('.gallery a', {
//         captionsData: 'alt',
//         captionsDelay: 250,
//       })
//     );

// .then(simpleLightbox.refresh());

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

// function renderImgCards(images) {
//   const markup = images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<div class="photo-card">
//   <img src=${webformatURL}  alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes - ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views - ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments - ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads - ${downloads}</b>
//     </p>
//   </div>
// </div>`;
//       }
//     )
//     .join('');

//   galleryRef.insertAdjacentHTML('beforeend', markup);
// }
