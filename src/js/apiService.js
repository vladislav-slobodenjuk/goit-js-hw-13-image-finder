import Pix from './fetchImages';
import renderGallery from '../templates/gallery.handlebars';
// import renderCard from '../templates/galleryCard.handlebars';

const gallery = document.querySelector('.gallery');

const sdfsdf = new Pix();

// console.dir(sdfsdf);

sdfsdf.query = 'cars';

console.log(sdfsdf.fetchImages());

console.log(sdfsdf.fetchImages().then(result => renderGallery(result))); //работатет
console.log(renderGallery(sdfsdf.fetchImages()));

sdfsdf.fetchImages().then(result => {
  console.log(renderGallery(result));
  // renderGallery(result);
  gallery.insertAdjacentHTML('beforeend', renderGallery(result)); //работает
});
