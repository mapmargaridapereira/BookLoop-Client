import axios from 'axios';

class BooksService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/offers
  createOffer = requestBody => {
    return this.api.post('/api/offers', requestBody);
  };

  // GET /api/offers
  getAllBooks = () => {
    return this.api.get('/api/offers');
  };

  // GET /api/offers/:id
  getBook = id => {
    return this.api.get(`/api/offers/${id}`);
  };

  // PUT /api/offers/:id
  updateBook = (id, requestBody) => {
    return this.api.put(`/api/books/${id}`, requestBody);
  };

  // DELETE /api/offers/:id
  deleteBook = id => {
    return this.api.delete(`/api/books/${id}`);
  };
}

// Create one instance object
const booksService = new BooksService();

export default booksService;