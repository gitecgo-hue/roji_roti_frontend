import axios from 'axios';

// global axios request interceptor: attach Authorization header when token is available
// and prevent requests to protected endpoints when token is missing.

axios.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const url = (config && config.url) ? String(config.url) : '';

  // determine if this request likely requires auth
  const isProtectedPath = /\/employees\//.test(url) || /\/employers\//.test(url);

  if (isProtectedPath && !token) {
    const err = new Error('NO_TOKEN');
    err.isNoToken = true;
    throw err;
  }

  if (token) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && (error.isNoToken || (error.message && error.message === 'NO_TOKEN'))) {
      // resolve with an empty response shape so callers can handle gracefully
      return Promise.resolve({ data: null });
    }
    return Promise.reject(error);
  }
);
