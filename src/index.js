import axions from 'axios';
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('searchQuery');

formRef.addEventListener('submit', onFormSubmit);

console.log(formRef);
console.log(formRef.elements.searchQuery);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(e.target.elements.searchQuery.value);
}
