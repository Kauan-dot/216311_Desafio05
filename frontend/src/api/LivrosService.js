import axios from "axios";

const BASE_URL = "https://two16311-desafio05.onrender.com/books"

export class LivrosService {
  static getLivros() {
    return axios.get(BASE_URL);
  }

  static getLivro(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  static createLivro(body) {
    return axios.post(BASE_URL, body);
  }

  static updateLivro(id, body) {
    return axios.put(`${BASE_URL}/${id}`, body);
  }

  static deleteLivro(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}
