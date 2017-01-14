import request from 'superagent';
import NossoLixoService from './NossoLixoService';

export default class PlaceService {
  constructor() {
    this.endpoint = NossoLixoService.endpoint();
  }

  all() {
    return request.get(this.endpoint + '/places');
  }
}
