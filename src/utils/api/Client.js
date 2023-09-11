import axios from 'axios';
import {stringify} from 'querystringify';
import utilsPath from '../path';
import GetRequest from './GetRequest';
import PostRequest from './PostRequest';
import UploadRequest from './UploadRequest';

class Client
{
  constructor(options){
    this._options = {...options};
    this._request = axios.create({
      baseURL: options.baseurl,
      timeout: options.timeout,
      withCredentials: true,
      maxRedirects: 0
    });
  }

  getOptions(){
    return this._options;
  }

  getRequest(){
    return this._request;
  }

  createGetRequest(path, options = {}){
    return new GetRequest(path, this._request, options);
  }

  createPostRequest(path, options = {}){
    return new PostRequest(path, this._request, options);
  }

  createUploadRequest(path, options = {}){
    return new UploadRequest(path, this._request, options);
  }

  url(path, params = {}){
    return utilsPath.compose([this._options.baseurl, path]) + '?' + stringify(params);
  }

  get(path, options = {}){
    return this.createGetRequest(path, options).fetch();
  }

  post(path, options = {}){
    return this.createPostRequest(path, options).fetch();
  }

  upload(path, options = {}){
    return this.createUploadRequest(path, options).fetch();
  }
}

export default Client;