import Notiflix from 'notiflix';
import { FetchImgService } from './js/fetch-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more');
const IS_HIDDEN = 'is-hidden';
const DELAY = 250;

let startNumberOfImages = 40;
let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 200,
});

loadMoreBtnRef.classList.add(IS_HIDDEN);

const fetchImgService = new FetchImgService();

formRef.addEventListener('submit', onFormSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();

  clearImagesDiv();

  fetchImgService.resetPage();

  loadMoreBtnRef.classList.add(IS_HIDDEN);

  fetchImgService.searchQuery =
    e.currentTarget.elements.searchQuery.value.trim();

  if (fetchImgService.searchQuery === '') {
    return Notiflix.Notify.failure('Please, enter your search query!.');
  }

  await fetchImgService
    .fetchImages()
    .then(data => {
      if (data.hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (data.hits.length < 40) {
        loadMoreBtnRef.classList.add(IS_HIDDEN);

        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        loadMoreBtnRef.classList.remove(IS_HIDDEN);
      }
      if (fetchImgService.page > 1) {
        Notiflix.Notify.success(
          `Hooray! We found ${fetchImgService.totalHits} images.`
        );
      }

      return data.hits;
    })
    .then(renderImgCards)
    .catch(error => {
      console.log(error);
    });
}

function onLoadMoreBtnClick() {
  fetchImgService.fetchImages().then(data => {
    renderImgCards(data.hits);

    startNumberOfImages += data.hits.length;

    if (startNumberOfImages === fetchImgService.totalHits) {
      loadMoreBtnRef.classList.add(IS_HIDDEN);

      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
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
        return `<div class="photo-card"><a class="gallery__item" href="${largeImageURL}">
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
	</a>
</div>`;
      }
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearImagesDiv() {
  galleryRef.innerHTML = '';
}
