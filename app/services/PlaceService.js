const request = require('superagent');
const NossoLixoService = require('./NossoLixoService');

class PlaceService {
  constructor() {
    this.endpoint = NossoLixoService.endpoint;
  }

  all() {
    return request.get(this.endpoint + '/places');
  }
}

export default PlaceService;
