// import { jquery as $ } from '../../node_modules/jquery/dist/jquery.min';
import $ from 'jquery';

const env = 'production';
import config from '../config/kinvey.config';
const Kinvey = config[env];

export function httpGET(module, url, useBasicAuth = true) {
  const headers = {
    'Authorization': useBasicAuth
      ? `Basic ${btoa(Kinvey.appId + ':' + Kinvey.appSecret)}`
      : `Kinvey ${window.sessionStorage.getItem('authToken')}`
  };

  return $.get({
    url: Kinvey.baseUrl + module + '/' + Kinvey.appId + '/' + url,
    headers: headers
  });
} 

export function httpPOST(module, url, useBasicAuth = true, data = {}) {
  const headers = {
    'Authorization': useBasicAuth
      ? `Basic ${btoa(Kinvey.appId + ':' + Kinvey.appSecret)}`
      : `Kinvey ${window.sessionStorage.getItem('authToken')}`
  };

  return $.post({
    url: Kinvey.baseUrl + module + '/' + Kinvey.appId + '/' + url,
    headers: headers,
    data: data
  });
}

export function httpPUT(module, url, useBasicAuth = true, data = {}) {
  const headers = {
    'Authorization': useBasicAuth
      ? `Basic ${btoa(Kinvey.appId + ':' + Kinvey.appSecret)}`
      : `Kinvey ${window.sessionStorage.getItem('authToken')}`
  };

  return $.ajax({
    url: Kinvey.baseUrl + module + '/' + Kinvey.appId + '/' + url,
    method: 'PUT',
    headers: headers,
    data: data
  });
}

export function httpDELETE(module, url, useBasicAuth = true) {
  const headers = {
    'Authorization': useBasicAuth
      ? `Basic ${btoa(Kinvey.appId + ':' + Kinvey.appSecret)}`
      : `Kinvey ${window.sessionStorage.getItem('authToken')}`
  };

  return $.ajax({
    url: Kinvey.baseUrl + module + '/' + Kinvey.appId + '/' + url,
    method: 'DELETE',
    headers: headers
  });
}

export function httpGETClientInfo(url) {
  return $.get({
    url: url
  });
}
