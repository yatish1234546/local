import endpoints from '@/api/endpoints';
import http from '@/util/http';

export function getUsers() {
  return http({
    url: endpoints.ENDPOINT_USERS,
    method: 'get',
  });
}

export function updateUser(user) {
  const data = user;
  return http({
    url: endpoints.ENDPOINT_USERS,
    method: 'put',
    data,
  });
}

export function createUser(user) {
  const data = user;
  return http({
    url: endpoints.ENDPOINT_USERS,
    method: 'post',
    data,
  });
}

export function deleteUser(user) {
  return http({
    url: `${endpoints.ENDPOINT_USERS}/${user.login}`,
    method: 'delete',
  });
}
