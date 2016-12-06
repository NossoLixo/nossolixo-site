const request = require('superagent');
const NossoLixoService = require('./NossoLixoService');

class CategoryService {
  constructor() {
    this.endpoint = NossoLixoService.endpoint;
  }

  all() {
    return request.get(this.endpoint + '/categories');
  }
}

export default CategoryService;
