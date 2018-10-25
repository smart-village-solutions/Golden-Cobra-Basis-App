/**
 * This is needed to create a customized effect method for Redux Offline configuration.
 * We configure our own effect method to handle 304 api requests correctly.
 *
 * from https://github.com/redux-offline/redux-offline/blob/master/src/defaults/effect.js
 */

export function NetworkError(response, status) {
  this.name = 'NetworkError';
  this.status = status;
  this.response = response;
}

const tryParseJSON = (json) => {
  if (!json) {
    return null;
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error(`Failed to parse unexpected JSON response: ${json}`);
  }
};

export const getResponseBody = (response) => {
  const contentType = response.headers.get('Content-Type') || false;
  if (contentType && contentType.indexOf('json') >= 0) {
    return response.text().then(tryParseJSON);
  }
  return response.text();
};
