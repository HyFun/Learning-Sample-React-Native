import axios from 'axios';

const http = axios.create({
  baseURL: 'https://gank.io/api/v2',
  timeout: 30000,
});

http.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.status === 100) {
        return response.data.data;
      } else {
        return Promise.reject(
          new Error(
            response.data.data || `请求api失败,错误码:${response.data.status}`,
          ),
        );
      }
    } else {
      return Promise.reject(new Error(`请求失败,错误码:${response.status}`));
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
