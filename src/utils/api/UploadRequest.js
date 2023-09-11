import Request from './Request';
import Fetcher from './Fetcher';
import createFormData from './createFormData';

class UploadRequest extends Request
{
  fetch(options = {}){
    return new Fetcher(cancelToken => {
      const {data, params, headers} = this._options;
      return this._request.request({
        method: 'post',
        url: this._path,
        data: createFormData({...data, ...options.data}),
        params: {...params, ...options.params},
        headers: {...headers, ...options.headers},
        cancelToken
      });
    });
  }
}

export default UploadRequest;