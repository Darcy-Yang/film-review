import fetch from 'isomorphic-fetch';
import { HOST } from '@/utils/config';

export default async (
  method,
  path,
  query = {},
  body = {},
  headers = {
    // default header is Content-Type = JSON
    'Content-Type': 'application/json; charset=utf-8',
  },
) => {
  // necessary method & path
  if (!method && !path) throw new Error('necessary method & path');

  if (!headers.Authorization) {
    console.log('no authorization');
  }

  // build options of fetch
  const options = (() => {
    const opt = {
      method,
      headers,
    };
    // if has body, insert body to opt
    if (Object.keys(body).length !== 0) {
      Object.assign(opt, {
        body: JSON.stringify(body),
      });
    }
    return opt;
  })();

  // build queryString of fetch
  const queryString = (() => {
    let queryStr = '';
    if (Object.keys(query).length !== 0) {
      Object.keys(query).forEach(key => {
        if ({}.hasOwnProperty.call(query, key)) {
          const value = query[key];
          if (key === Object.keys(query)[0]) {
            queryStr += `?${key}=${value}`;
          } else {
            queryStr += `&${key}=${value}`;
          }
        }
      });
    }
    return queryStr.replace(/\+/g, '%2B');
  })();

  const res = await fetch(`${HOST}${path}${queryString}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg);
  return data;
};
