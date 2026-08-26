import axios from 'axios';
import api from '@/store/api';

// global axios request interceptor: attach Authorization header when token is available
// and prevent requests to protected endpoints when token is missing.

axios.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = (config && config.url) ? String(config.url) : '';

    // determine if this request likely requires auth
    // protected paths include '/employees/' and '/employers/' and endpoints under API base
    const isProtectedPath = /\/employees\//.test(url) || /\/employers\//.test(url);

    if (isProtectedPath && !token) {
      const err = new Error('NO_TOKEN');
      // mark so response interceptor can swallow it
      err.isNoToken = true;
      throw err;
    }

    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (e) {
    // rethrow to be handled by response interceptor
    throw e;
  }
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if request was cancelled due to missing token, swallow and return null
    if (error && (error.isNoToken || (error.message && error.message === 'NO_TOKEN'))) {
      return Promise.resolve(null);
    }

    return Promise.reject(error);
  }
);
