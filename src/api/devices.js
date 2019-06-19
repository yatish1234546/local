import endpoints from '@/api/endpoints';
import http from '@/util/http';

export function getDevicesInfo() {
  return http({
    url: endpoints.ENDPOINT_USERS,
    method: 'get',
  });
}

export function getPortDetails(id) {
  return http({
    url: endpoints.ENDPOINT_USERS / `${id}`,
    method: 'get',
  });
}
