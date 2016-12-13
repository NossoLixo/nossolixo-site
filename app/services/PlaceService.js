import request from 'superagent';
import NossoLixoService from './NossoLixoService';

class PlaceService {
  constructor() {
    this.endpoint = NossoLixoService.endpoint();
  }

  all() {
    return request.get(this.endpoint + '/places');
  }
}

export default PlaceService;
