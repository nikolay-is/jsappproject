const Kinvey = {
  production: {
      baseUrl: 'https://baas.kinvey.com/',
      appId: '',
      appSecret: '',
      collections: {
        users: 'users',
        tests: 'tests',
        categories: 'categories'
      }
  },

  development: {
      baseUrl: 'https://baas.kinvey.com/',
      appId: 'kid_Bk_i5Axmx',
      appSecret: '1fa5008a940b4ae5afdd3f4bbbff29ee',
      collections: {
        users: 'users',
        tests: 'tests',
        categories: 'categories'
      }
  },
}

export default Kinvey;
