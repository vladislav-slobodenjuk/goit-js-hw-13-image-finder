import Pixabay from './apiService';
import renderGallery from '../templates/gallery.handlebars';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  distance: '60px',
});

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const pixabay = new Pixabay();

form.addEventListener('submit', renderResult);

async function renderResult(evt) {
  evt.preventDefault();
  // console.log(evt);

  pixabay.query = evt.target.searchQuery.value; //обратиться к инпуту внутри формы можно только по имени

  try {
    if (pixabay.query.trim() === '') {
      //сделать уведомление

      Notiflix.Notify.failure('Enter search query');
      throw new Error('Enter search query');
    }

    let result = await pixabay.fetchImages();
    if (result.hits.length === 0) {
      //сделать уведомление

      Notiflix.Notify.warning('Empty search result');
      form.reset();
      throw new Error('Empty search result');
    }

    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', renderGallery(result.hits));
    let totalFound = result.total;

    console.log(totalFound);
    // console.log(result);

    form.reset();
    loadBtn.classList.remove('visually-hidden');
    Notiflix.Notify.info(`Images found`); // не удается передать totalFound
  } catch (error) {
    console.log(error);
  }
}

loadBtn.addEventListener('click', loadNextPage);

async function loadNextPage() {
  pixabay.page += 1;
  try {
    let result = await pixabay.fetchImages();
    gallery.insertAdjacentHTML('beforeend', renderGallery(result.hits));
  } catch (error) {
    console.log('fetch error:', error);
  }
}

const bottom = document.getElementById('scroll-to-bottom');

loadBtn.addEventListener('click', scrollToNew);

function scrollToNew() {
  setTimeout(() => {
    bottom.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 600);
}

const top = document.getElementById('scroll-to-top');

form.addEventListener('submit', scrollToTop);

function scrollToTop() {
  setTimeout(() => {
    top.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 600);
}
