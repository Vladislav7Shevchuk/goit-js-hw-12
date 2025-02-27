import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
  perPage: 40,
};

async function handleSubmit(e) {
  e.preventDefault();

  params.query = input.value.trim();
  if (!params.query) return showMessage();
  params.page = 1;

  input.value = '';
  showLoader();

  try {
    const data = await fetchImage(params.query, params.page, params.perPage);
    const images = data.data.hits;
    params.total = data.data.totalHits;

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
    hideLoaderDown();
    showMessage();
  }
}

function clearGallery() {
  galleryImages.innerHTML = '';
}

btn.addEventListener('click', async () => {
  params.page += 1;

  hideBtn();
  showLoaderDown();

  try {
    const data = await fetchImage(params.query, params.page, params.perPage);
    const images = data.data.hits;

    const markup = images.map(createImageCard).join('');
    galleryImages.insertAdjacentHTML('beforeend', markup);

    hideLoaderDown();

    checkBtnStatus();

    scrollAfterLoad();
  } catch (err) {
    console.error('❌ Помилка:', err);
    hideLoaderDown();
  }
});

function checkBtnStatus() {
  const maxPage = Math.ceil(params.total / params.perPage);

  if (params.page >= maxPage) {
    hideBtn();
    showMessageLoad();
  } else {
    showBtn();
  }
}

function showBtn() {
  btn.classList.remove('hidden');
}

function hideBtn() {
  btn.classList.add('hidden');
}

function showLoaderDown() {
  loaderDown.classList.remove('hidden');
}

function hideLoaderDown() {
  loaderDown.classList.add('hidden');
}

function showMessageLoad() {
  iziToast.show({
    position: 'topRight',
    message: 'We are sorry, but you have reached the end of search results.',
    messageSize: '16px',
    messageLineHeight: '24px',
    messageColor: 'black',
    maxWidth: '432px',
    backgroundColor: '#007bff',
  });
}

function scrollAfterLoad() {
  const { height } = galleryImages.lastElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
