import { makeGetRequest, makePostRequest} from './base.js';
const ENDPOINT ='users'
const getTest = async () => {
  return makeGetRequest('');
};
const postTest = async (body) => {
  return makePostRequest(ENDPOINT,body);
};
export { getTest, postTest };
