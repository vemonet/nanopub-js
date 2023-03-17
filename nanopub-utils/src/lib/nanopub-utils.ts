/* eslint-disable functional/immutable-data */

// import json2html from 'node-json2html';

export const grlcNpApiUrls = [
  'https://grlc.nps.petapico.org/api/local/local/',
  'https://grlc.services.np.trustyuri.net/api/local/local/'
];

export const getUpdateStatus = (elementId: string, npUri: string) => {
  document.getElementById(elementId).innerHTML = '<em>Checking for updates...</em>';
  const shuffledApiUrls = [...grlcNpApiUrls].sort(() => 0.5 - Math.random());
  getUpdateStatusX(elementId, npUri, shuffledApiUrls);
};

const getUpdateStatusX = (elementId: string, npUri: string, apiUrls) => {
  if (apiUrls.length == 0) {
    const h: HTMLElement = document.getElementById(elementId) as HTMLInputElement;
    h.innerHTML = '<em>An error has occurred while checking for updates.</en>';
    return;
  }
  const apiUrl = apiUrls.shift();
  const requestUrl = apiUrl + '/get_latest_version?np=' + npUri;
  const r = new XMLHttpRequest();
  r.open('GET', requestUrl, true);
  r.setRequestHeader('Accept', 'application/json');
  r.responseType = 'json';
  r.onload = function () {
    // eslint-disable-next-line functional/no-let
    let h = '';
    if (r.status == 200) {
      const bindings = r.response['results']['bindings'];
      if (bindings.length == 1 && bindings[0]['latest']['value'] === npUri) {
        h = 'This is the latest version.';
      } else if (bindings.length == 0) {
        h = 'This nanopublication has been <strong>retracted</strong>.';
      } else {
        h = 'This nanopublication has a <strong>newer version</strong>: ';
        if (bindings.length > 1) {
          h = 'This nanopublication has <strong>newer versions</strong>: ';
        }
        // eslint-disable-next-line functional/no-loop-statement
        for (const b of bindings) {
          const l = b['latest']['value'];
          h += ' <code><a href="' + l + '">' + l + '</a></code>';
        }
      }
      document.getElementById(elementId).innerHTML = h;
    } else {
      getUpdateStatusX(elementId, npUri, apiUrls);
    }
  };
  r.onerror = function () {
    getUpdateStatusX(elementId, npUri, apiUrls);
  };
  r.send();
};

export const getJson = (url: string, callback) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'json';
  request.onload = function () {
    const status = request.status;
    if (status === 200) {
      callback(null, request.response);
    } else {
      callback(status, request.response);
    }
  };
  request.send();
};

// export const populate = (elementId, apiUrl, template) => {
//   getJson(apiUrl, function (error, response) {
//     if (error == null) {
//       document.getElementById(elementId).innerHTML = json2html.render(response, template);
//     } else {
//       document.getElementById(elementId).innerHTML =
//         '<li><em>error: something went wrong with calling the API</en></li>';
//     }
//   });
// };

export const getLatestNp = callback => {
  fetch('https://server.np.trustyuri.net/nanopubs.txt')
    .then(response => response.text())
    .then(data => {
      const lines = data.split(/\n/);
      callback(lines[lines.length - 2]);
    });
};
