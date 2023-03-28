import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const countriesInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const name = e.target.value.trim();

  if (name === '') {
    countriesInfoRef.innerHTML = '';
    countriesListRef.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(renderCountriesInfo)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderCountriesInfo(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countriesListRef.innerHTML = '';
  }

  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="${name.official}" width="40px">
          <h1>${name.official}</h1>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Langueges: ${Object.values(languages)}</p>`;
    })
    .join('');
  countriesInfoRef.innerHTML = markup;

  if (countries.length > 1) {
    countriesInfoRef.innerHTML = '';
  }

  renderCountriesList(countries);
}

function renderCountriesList(countries) {
  if (countries.length > 1 && countries.length <= 10) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li>
        <img src="${flags.svg}" alt="${name.official}" width="40px">
        <p>${name.official}</p>
      </li>`;
      })
      .join('');
    countriesListRef.innerHTML = markup;
  }

  if (countries.length === 1) {
    countriesListRef.innerHTML = '';
  }
}
