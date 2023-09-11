import Request from './Request';
import Fetcher from './Fetcher';

class GetRequest extends Request
{
  fetch(options = {}){
    return new Fetcher(cancelToken => {
      const {data, params, headers} = this._options;
      return this._request.request({
        method: 'get',
        url: this._path,
        params: {...data, ...options.data, ...params, ...options.params},
        headers: {...headers, ...options.headers},
        cancelToken
      });
    });
  }
}

export default GetRequest;