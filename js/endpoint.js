function URLQueryStringToObject(url) {
  const request = {};
  const startQueryPos = url.indexOf('?');
  if (startQueryPos === -1) {
    return undefined;
  } // Early exit if no query on url
  const pairs = url.substring(startQueryPos + 1).split('&');
  for (const i of pairs) {
    if (!i) {
      continue;
    }
    const pair = i.split('=');
    request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return request;
}

var queryObj = URLQueryStringToObject(window.location.href);
var queryJSON = JSON.stringify(queryObj);

queryJSON = window.location.href;

var endpointLog = localStorage.getItem('endpointLog');
if (!endpointLog) {
  localStorage.setItem('endpointLog', queryJSON);
}
else {
  localStorage.setItem('endpointLog', endpointLog + "\n" + queryJSON);
}
