import api from './api';

export const login = async (username, password) => {
  const response = await api.post('auth/login/', { username, password });
  return response.data;
};

export const register = async (username, email, password, nativeLanguages, languagesToLearn) => {
  const response = await api.post('auth/register/', 
    { username, email, password, native_languages: nativeLanguages, languages_to_learn: languagesToLearn }
  );
  return response.data;
};

export const verify = async (username, token) => {
  const response = await api.post('auth/verify/', { username, token });
  return response.data;
}

export const refresh = async token => {
  const response = await api.post('auth/token/refresh/', { refresh: token });
  return response.data;
};

// export const getCurrentUser = async accessToken => {
//   const response = await api.get('auth/current-user/', {
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   });
//   return response.data;
// }

export const checkUserExists = async params => {
  try {
    const response = await api.get('users/user-exists/', { params });
    return response.data.user_exists;
  }
  catch (error) {
    return null;
  }
}