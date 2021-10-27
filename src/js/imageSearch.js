import Pixabay from './apiService';
import renderGallery from '../templates/gallery.handlebars';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const pixabay = new Pixabay();

// console.log(pixabay.fetchImages().then(result => renderGallery(result))); //работатет

pixabay.fetchImages().then(result => {
  // console.log(renderGallery(result));
  // gallery.insertAdjacentHTML('beforeend', renderGallery(result)); //работает
});

form.addEventListener('submit', renderResult);

async function renderResult(evt) {
  evt.preventDefault();
  // console.log(evt);

  pixabay.query = evt.target.searchQuery.value; //обратиться к инпуту внутри формы можно только по имени

  try {
    if (pixabay.query.trim() === '') {
      //сделать уведомление
      throw new Error('Enter search query');
    }

    let result = await pixabay.fetchImages();
    if (result.length === 0) {
      //сделать уведомление
      throw new Error('Empty search result');
    }

    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', renderGallery(result));
    // console.log(result);
    form.reset();
    loadBtn.classList.remove('visually-hidden');
  } catch (error) {
    console.log(error);
  }
}

loadBtn.addEventListener('click', loadNextPage);

async function loadNextPage() {
  pixabay.page += 1;
  try {
    if (pixabay.query.trim() === '') {
      //сделать уведомление
      throw new Error('Enter search query');
    }
    let result = await pixabay.fetchImages();
    gallery.insertAdjacentHTML('beforeend', renderGallery(result));
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
