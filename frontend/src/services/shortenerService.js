import baseAPI from './api';

async function getLink(code) {
  const result = await baseAPI.get(`links/${code}`);
  return result.data;
}

async function getStats(code) {
  const result = await baseAPI.get(`links/${code}/stats`);
  return result.data;
}

async function postCreate(model) {
  const result = await baseAPI.post('links', model);
  return result.data;
}

export default {
  getLink,
  getStats,
  postCreate,
};
