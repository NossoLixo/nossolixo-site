import request from 'superagent';
import NossoLixoService from './NossoLixoService';

class CategoryService {
  constructor() {
    this.endpoint = NossoLixoService.endpoint();
  }

  all() {
    return request.get(this.endpoint + '/categories');
  }
}

export default CategoryService;
