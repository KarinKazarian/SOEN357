import axios from 'axios';

const apiUrl =
  'https://besttime.app/api/v1/forecasts';

const makeRequest = async (method, body = {}, params = {}) => {
  const options = {
    method: method,
    url: `${apiUrl}`,
    data: body,
    params: params,
  };

  const response = await axios(options);
  return response;
};

const makeGetRequest = async () => {
  return makeRequest('get');
};

const makePostRequest = async (params = {}) => {
  return makeRequest('post',"", params);
};



export { makeGetRequest, makePostRequest };
