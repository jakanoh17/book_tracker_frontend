export default class GoogleBooksApi {
  // searchInput is a string that has yet to be processed for Gooogle Books Api yet
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  _processSearchInput(searchInput) {
    this.searchInput = searchInput.replaceAll(", ", "+");
    this.searchInput = this.searchInput.replaceAll(" ", "+");
  }

  _requestTemplate(endpoint, method, body) {
    return fetch(this.baseUrl + endpoint, {
      method,
      body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Error: ${res.status}`);
    });
  }

  getBookInfo(searchInput) {
    this._processSearchInput(searchInput);
    return this._requestTemplate(
      `/books/v1/volumes?q=${this.searchInput}&key=${this.apiKey}&maxResults=18`
    );
  }
}
