import axios from 'axios';

const apiUrl = "https://api.mocki.io/v1/b043df5a";

const makeRequest = async (method, endpoint, body = {}, params = {}) => {
  const options = {
    method: method,
    url: `${apiUrl}/${endpoint}`,
    data: body,
    params: params,
  };

  const response = await axios(options);
  return response;
};

const makeGetRequest = async (endpoint) => {
  return makeRequest('get', endpoint);
};

const makePostRequest = async (endpoint, body = {}) => {
  return makeRequest('post', endpoint, body);
};

const makeDeleteRequest = async (endpoint, body = {}) => {
  return makeRequest('delete', endpoint, body);
};

const makePatchRequest = async (endpoint, body = {}, params = {}) => {
  return makeRequest('patch', endpoint, body, params);
};

export { makeGetRequest, makePostRequest, makeDeleteRequest, makePatchRequest };
