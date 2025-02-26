// import { fetchImage } from './js/pixabay-api.js';
// import {
//   hideLoader,
//   createImageCard,
//   renderGallery,
//   showLoader,
//   showMessage,
// } from './js/render-functions.js';

// const form = document.querySelector('form');
// const input = document.querySelector('#query');
// const btn = document.querySelector('.load');
// const galleryImages = document.querySelector('.gallery');
// const loaderDown = document.querySelector('.loader-box-down');

// form.addEventListener('submit', handleSubmit);

// const params = {
//   query: '',
//   page: 1,
//   total: 0,
// };

// async function handleSubmit(e) {
//   e.preventDefault();

//   params.query = input.value.trim();
//   if (!params.query) return showMessage();
//   params.page = 1;

//   input.value = '';
//   showLoader();
//   try {
//     const data = await fetchImage(params.query, params.page);
//     console.log(data);
//     const images = data.data.hits;
//     params.total = data.totalHits;

//     checkBtnStatus();

//     if (!images || images.length === 0) {
//       btn.classList.add('hidden');

//       clearGallery();

//       throw new Error('No images found');
//     }

//     renderGallery(images);

//     btn.classList.remove('hidden');
//   } catch (err) {
//     console.error('❌ Помилка:', err);
//     hideLoader();
//     showMessage();
//   }
// }

// function clearGallery() {
//   galleryImages.innerHTML = '';
// }

// btn.addEventListener('click', async () => {
//   params.page += 1;
//   const data = await fetchImage(params.query, params.page);
//   const images = data.data.hits;
//   const markup = images.map(createImageCard).join('');
//   galleryImages.insertAdjacentHTML('beforeend', markup);
// });

// function showBtn() {
//   btn.classList.remove('hidden');
// }

// function hideBtn() {
//   btn.classList.add('hidden');
// }

// function checkBtnStatus() {
//   const perPage = 40;
//   const maxPage = Math.ceil(params.total / perPage);

//   if (params.page >= maxPage) {
//     hideBtn();
//   } else {
//     showBtn();
//   }
// }

// function showLoaderDown() {
//   loaderDown.classList.remove('hidden');
// }

// function hideLoaderDown() {
//   loaderDown.classList.add('hidden');
// }

import { fetchImage } from './js/pixabay-api.js';
import {
  hideLoader,
  createImageCard,
  renderGallery,
  showLoader,
  showMessage,
} from './js/render-functions.js';

const form = document.querySelector('form');
const input = document.querySelector('#query');
const btn = document.querySelector('.load');
const galleryImages = document.querySelector('.gallery');
const loaderDown = document.querySelector('.loader-box-down');

form.addEventListener('submit', handleSubmit);

const params = {
  query: '',
  page: 1,
  total: 0,
};

async function handleSubmit(e) {
  e.preventDefault();

  params.query = input.value.trim();
  if (!params.query) return showMessage();
  params.page = 1;

  input.value = '';
  showLoader();

  try {
    const data = await fetchImage(params.query, params.page);
    console.log(data);
    const images = data.data.hits;
    params.total = data.totalHits;

    if (!images || images.length === 0) {
      hideBtn();
      clearGallery();
      throw new Error('No images found');
    }

    clearGallery();
    renderGallery(images);

    checkBtnStatus();
  } catch (err) {
    console.error('❌ Помилка:', err);
    hideLoader();
    showMessage();
  }
}

function clearGallery() {
  galleryImages.innerHTML = '';
}

btn.addEventListener('click', async () => {
  params.page += 1;

  try {
    const data = await fetchImage(params.query, params.page);
    const images = data.data.hits;

    if (!images || images.length === 0) {
      hideBtn();
      return;
    }

    const markup = images.map(createImageCard).join('');
    galleryImages.insertAdjacentHTML('beforeend', markup);

    checkBtnStatus();
  } catch (err) {
    console.error('❌ Помилка:', err);
  }
});

function showBtn() {
  btn.classList.remove('hidden');
}

function hideBtn() {
  btn.classList.add('hidden');
}

function checkBtnStatus() {
  const perPage = 40;
  const maxPage = Math.ceil(params.total / perPage);

  if (params.page >= maxPage) {
    hideBtn();
  } else {
    showBtn();
  }
}
