import endpoints from '@/api/endpoints';
import http from '@/util/http';

export default function authenticate(username, password) {
  const data = {
    username,
    password,
  };
  return http({
    url: endpoints.ENDPOINT_LOGIN,
    method: 'post',
    data,
  });
}
