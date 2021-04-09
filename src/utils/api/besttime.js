import axios from 'axios';

const apiUrl =
  'https://besttime.app/api/v1/keys/pri_7b5f18965b7d46a5b708eeee58fc2354';

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



export { makeGetRequest, makePostRequest };
