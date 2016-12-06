import { httpPOST, httpGET } from '../utilities/util';

import ERR from '../utilities/err';

const p_username = /^[a-zA-Z][a-zA-Z0-9_\-\.,!@#$%^]{4,}$/;
const p_password = /^[a-zA-Z0-9_\-\.,!@#$%^]{5,}$/;
const p_email = /^[a-zA-Z]\w*@\w+\.\w+$/;

function userLogin(username, password) {
  if (!validate(username, p_username))
    return new Promise((resolve, reject) => reject(ERR.BAD_USERNAME));

  if (!validate(password, p_password))
    return new Promise((resolve, reject) => reject(ERR.BAD_PASSWORD));

  return new Promise((resolve, reject) => {
    httpPOST('user', 'login', true, { username: username, password: password })
      .then(loggedInUser => resolve(loggedInUser))
      .catch(err => reject(err));
  });
}

function userRegister(username, password, email) {
  if (!validate(username, p_username))
    return new Promise((resolve, reject) => reject(ERR.BAD_USERNAME));

  if (!validate(password, p_password))
    return new Promise((resolve, reject) => reject(ERR.BAD_PASSWORD));

  if (!validate(email, p_email))
    return new Promise((resolve, reject) => reject(ERR.BAD_EMAIL));

  return new Promise((resolve, reject) => {
    httpPOST('user', '', true, {
      username: username,
      password: password,
      email: email,
      tests: []
    })
      .then(registeredUser => resolve(registeredUser))
      .catch(err => reject(err));
  });
}

function userLogout() {
  return new Promise((resolve, reject) => {
    httpPOST('user', '_logout', false)
      .then(() => resolve(true))
      .catch(err => reject(err));
  });
}

function getUserTests(id) {
  return new Promise((resolve, reject) => {
    httpGET('user', id, false)
      .then(userData => resolve(userData.tests || []))
      .catch(err => reject(err));
  });
}

function validate(what, regex) {
  return regex.test(what);
}

export { userLogin, userRegister, userLogout, getUserTests };
