export default class PixabayImageAPI {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.API_KEY = '24000598-4cbb5e18617bf8e66757f824b';
    this._type = 'photo';
    this._orientation = 'horizontal';
    this._query = '';
    this._page = 1;
    this._perPage = 12;
  }

  get query() {
    return this._query;
  }

  set query(value) {
    return (this._query = value);
  }

  get page() {
    return this._page;
  }

  set page(value) {
    return (this._page = value);
    // над этим поработать
  }

  resetPage() {
    this._page = 1;
  }

  async fetchImages() {
    let params = `?key=${this.API_KEY}&q=${this._query}&image_type=${this._type}&orientation=${this._orientation}&page=${this._page}&per_page=${this._perPage}`;
    let url = this.BASE_URL + params;
    // console.log(url);
    try {
      const response = await fetch(url);
      const responseJson = await response.json(); // с этим await магия, почему без него не работатает?

      // console.log(responseJson.hits);
      return responseJson.hits;
    } catch (error) {
      console.dir(error);
    }
  }
}
