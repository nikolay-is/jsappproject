const Kinvey = {
  production: {
      baseUrl: 'https://baas.kinvey.com/',
      appId: 'kid_BJc95O_Mg',
      appSecret: '4a600d13efcd47b19371e901824a416b',
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
