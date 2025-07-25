import api from './api';

export const getLanguageList = async () => {
  const response = await api.get('dictionary/languages/');
  return response.data;
};