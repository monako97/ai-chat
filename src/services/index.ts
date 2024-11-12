import { extend } from '@moneko/request';

import { global } from '@/store/global';

extend({
  interceptor: {
    request(req) {
      req.headers!.Authorization = `Bearer ${global.OPENROUTER_API_KEY}`;
    },
    httpError(res) {
      global.error = res.responseType === 'text' ? JSON.parse(res.response) : res.response;
    },
  },
  prefixUrl: 'https://openrouter.ai/api/v1',
});
