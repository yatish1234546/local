import {
  findAll, findUser, addUser, removeUser, findAllRoles,
} from '@/api/mock/data/mock-users';
import http from '@/util/http';

export function getUsers() {
  return Promise.resolve({ data: findAll() });
}

export function updateUser(user) {
  const data = user;
}

export function createUser(user) {
  let data = user;
  data = addUser(user);
  return Promise.resolve({ data });
}

export function deleteUser(user) {
  removeUser(user);
  return Promise.resolve();
}

export function getRoles() {
  return Promise.resolve({ data: findAllRoles() });
}
