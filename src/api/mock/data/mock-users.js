import _ from 'lodash';

const sysAdmin = {
  id: 1,
  userName: 'admin',
  password: 'password',
  roles: ['ROLE_SYS_ADMIN', 'ROLE_EXECUTIVE', 'ROLE_FACILITY_ADMIN'],
  firstName: 'System',
  lastName: 'Admin',
  email: 'admin@dbspoe.com',
  phone: '',
  created: '',
  lastLogin: '',
};

const facilityAdmin = {
  id: 2,
  userName: 'fadmin',
  password: 'password',
  roles: ['ROLE_FACILITY_ADMIN'],
  firstName: 'Facility',
  lastName: 'Admin',
  email: 'fadmin@dbspoe.com',
  phone: '',
  created: '',
  lastLogin: '',
};

const fieldEngg = {
  id: 3,
  userName: 'fengg',
  password: 'password',
  roles: ['ROLE_FIELD_ENGG'],
  firstName: 'Field',
  lastName: 'Engineer',
  email: 'fieldengg@dbspoe.com',
  phone: '',
  created: '',
  lastLogin: '',
};

const supportEngg = {
  id: 4,
  userName: 'sengg',
  password: 'password',
  roles: ['ROLE_SUPPORT_ENGG'],
  firstName: 'Support',
  lastName: 'Engineer',
  email: 'sengg@dbspoe.com',
  phone: '',
  created: '',
  lastLogin: '',
};

const executive = {
  id: 5,
  userName: 'exec',
  password: 'password',
  roles: ['ROLE_EXECUTIVE'],
  firstName: 'Company',
  lastName: 'Executive',
  email: 'exec@dbspoe.com',
  phone: '',
  created: '',
  lastLogin: '',
};

const users = [sysAdmin, facilityAdmin, fieldEngg, supportEngg, executive];

const roles = [
  'ROLE_SUPPORT_ENGG',
  'ROLE_EXECUTIVE',
  'ROLE_SYS_ADMIN',
  'ROLE_FACILITY_ADMIN',
  'ROLE_FIELD_ENGG',
];

export function findAll() {
  return users;
}

export function findUser(uname) {
  for (const user of users) {
    if (user.userName === uname) {
      return user;
    }
  }

  return null;
}

export function addUser(user) {
  const id = users.length;
  user.id = id;
  users.push(user);
  return user;
}

export function removeUser(user) {
  const index = _.findIndex(users, o => o.userName === user.userName);
  if (index > -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}

export function findAllRoles() {
  return roles;
}
