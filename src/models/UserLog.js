import { httpGETClientInfo, httpPOST,  httpGET } from '../utilities/util';

//import ERR from '../utilities/err';


function loadUserLog(id) {
  return new Promise((resolve, reject) => {
    httpGET('appdata', 'userlog/?query={"id":"' + id +'"}', false)
      .then(userlogData => resolve(userlogData))
      .catch(err => reject(err));
  })
}

function getClientInfo(url, userId) {
  return new Promise((resolve, reject) => {
    httpGETClientInfo(url)
      .then((data) => {
          return new Promise((resolve, reject) => {
            httpPOST('appdata', 'userlog', false, { "id": userId, "countryCode": data.countryCode, "country": data.country, "city": data.city, "regionName": data.regionName, "isp": data.isp, "lat": data.lat, "lon": data.lon, "ip": data.query, "timezone": data.timezone, "zip": data.zip })
                .then(clientInfo => resolve(clientInfo))
            .catch(err => reject(err));
          });
      })
      .catch(err => reject(err));
  });
}

export { getClientInfo, loadUserLog};
