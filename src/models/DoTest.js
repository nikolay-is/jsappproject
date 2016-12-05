import { httpGET } from '../utilities/util';

// import ERR from '../utilities/err';

// const p_username = /^[a-zA-Z][a-zA-Z0-9_\-\.,!@#$%^]{4,}$/;
// const p_password = /^[a-zA-Z0-9_\-\.,!@#$%^]{5,}$/;
// const p_email = /^[a-zA-Z]\w*@\w+\.\w+$/;

// function create(test = {}) {
//   let data = {
//     title: test.title || '',
//     description: test.description || '',
//     questions: test.questions || []
//   };

//   return new Promise((resolve, reject) => {
//     httpPOST('appdata', 'tests', false, data)
//       .then(result => resolve(result))
//       .catch(err => reject(err));
//   });
// }

function getTestData(id) {
  return new Promise((resolve, reject) => {
    httpGET('appdata', 'tests/' + id, false)
    .then(testData => resolve(testData))
    .catch(err => reject(err));
  });
}

// function userRegister(username, password, email) {
//   if (!validate(username, p_username))
//     return new Promise((resolve, reject) => reject(ERR.BAD_USERNAME));

//   if (!validate(password, p_password))
//     return new Promise((resolve, reject) => reject(ERR.BAD_PASSWORD));

//   if (!validate(email, p_email))
//     return new Promise((resolve, reject) => reject(ERR.BAD_EMAIL));

//   return new Promise((resolve, reject) => {
//     httpPOST('user', '', true, { username: username, password: password, email: email })
//       .then(registeredUser => resolve(registeredUser))
//       .catch(err => reject(err));
//   });
// }

// function validate(what, regex) {
//   return regex.test(what);
// }

export { getTestData };
