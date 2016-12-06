import { httpGET, httpPOST, httpPUT } from '../utilities/util';

import ERR from '../utilities/err';

const p_title = /^[a-zA-Z_][ a-zA-Z0-9_\-!@#$%^&*()=+]{4,}$/;

function create(test = {}) {
  if ( !(test.title && validate(test.title, p_title) && test.questions) )
    return new Promise((resolve, reject) => {
      reject(ERR.BAD_TEST);
    })

  const data = {
    title: test.title || '',
    description: test.description || '',
    questions: test.questions || []
  };

  return new Promise((resolve, reject) => {
    httpPOST('appdata', 'tests', false, data)
      .then(newTestData => resolve(newTestData))
      .catch(err => reject(err));
  });
}

function submitResult(testResult) {
  if ( !(testResult.id &&
        testResult.result.title && validate(testResult.result.title, p_title) &&
        testResult.result.questions.length &&
        // testResult.result.total_participants &&
        // testResult.result.best_time &&
        testResult.result.userId &&
        testResult.result.userName &&
        testResult.result.date) )
    return new Promise((resolve, reject) => {
      reject(ERR.BAD_TEST_RESULTS);
    });

    return new Promise((resolve, reject) => {
      httpPOST('appdata', 'results', false, testResult)
        .then(testResultData => resolve(testResultData))
        .catch(err => reject(err));
    })
}

function lockTestForUser(testId, userId) {
  if (testId && userId) {
    httpGET('user', userId, false)
      .then(userData => {
        let doneTests = userData.tests || [];

        let testCompleted = false;
        for (let test of doneTests) {
          if (test.id === testId) {
            testCompleted = true;
            break;
          }
        } 

        if (!testCompleted) {
          doneTests.push({
            id: testId,
            result: {
              score: 0,
              time: 0,
              date: Date.now()
            }
          });

          return new Promise((resolve, reject) => {
            httpPUT('user', userId, false, { tests: doneTests })
              .then(updatedUserData => resolve(updatedUserData))
              .catch(err => reject(err))
          });
        };
      })
      .catch(err => console.error(err));
  }
}

function updateTestStats(id, data) {
  if (id && data && typeof data === 'object') {
    return new Promise((resolve, reject) => { 
      httpPUT('appdata', 'tests/' + id, false, data)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
}

function getTests() {
  return new Promise((resolve, reject) => {
    httpGET('appdata', 'tests', false)
      .then(testList => resolve(testList))
      .catch(err => reject(err));
  })
}

function loadTestDetails(id) {
  return new Promise((resolve, reject) => {
    httpGET('appdata', 'tests/' + id, false)
      .then(testData => resolve(testData))
      .catch(err => reject(err));
  })
}

function updateUserResults(results) {
  if ( !(results.id && results.testId && results.date) )
    return new Promise((resolve, reject) => {
      reject(ERR.BAD_TEST_RESULTS);
    });

  httpGET('user', results.id, false)
    .then(userData => {
      let tests = userData.tests;

      for (let idx = 0; idx < tests.length; ++idx) {
        if (results.testId === tests[idx].id) {
          tests[idx].result = {
            score: results.score,
            time: results.time,
            date: results.date
          };

          console.log(tests);
          return new Promise((resolve, reject) => {
            httpPUT('user', results.id, false, { tests: tests })
              .then(updatedUserData => resolve(updatedUserData))
              .catch(err => reject(err));
          });
        }
      }
  })
  .catch(err => new Promise((resolve, reject) => reject(err)));
}

function validate(what, regex) {
  return regex.test(what);
}

export { loadTestDetails, getTests, create, submitResult, lockTestForUser, updateTestStats, updateUserResults };
