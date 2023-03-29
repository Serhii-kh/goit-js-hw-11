import axions from 'axios';
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('searchQuery');

formRef.addEventListener('submit', onFormSubmit);

console.log(formRef);
console.log(formRef.elements.searchQuery);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements.searchQuery.value);
}

const fetchUsers = async () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const userIds = [1, 2, 3];

  // 1. Создаём массив промисов
  const arrayOfPromises = userIds.map(async userId => {
    const response = await fetch(`${baseUrl}/users/${userId}`);
    console.log(arrayOfPromises);
    return response.json();
  });

  // 2. Запускаем все промисы параллельно и ждем их завершения
  const users = await Promise.all(arrayOfPromises);
  console.log(users);
};

fetchUsers();
