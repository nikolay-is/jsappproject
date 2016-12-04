const ERR = {
  BAD_USERNAME: {
    status: 601,
    statusText: 'Bad username provided by user'
  },

  BAD_PASSWORD: {
    status: 602,
    statusText: 'Bad password provided by user'
  },

  BAD_EMAIL: {
    status: 605,
    statusText: 'Bad email provided by user'
  },

  BAD_USER_DATA: {
    status: 610,
    statusText: 'Bad user data received from Kinvey'
  },
};

export default ERR;