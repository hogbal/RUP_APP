const createPOSTObject = (url, jsondata = null) => {
  const requestURL = 'http://hogbal.iptime.org:8080/' + url;
  const response = fetch(requestURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jsondata),
  });
  return response;
};

const createGETObject = (url, uid = null) => {
  let requestURL = '';
  if (uid !== null) {
    requestURL = 'http://hogbal.iptime.org:8080/' + url + '?uid=' + uid;
  } else {
    requestURL = 'http://hogbal.iptime.org:8080/' + url;
  }
  const response = fetch(requestURL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  return response;
};

export {createPOSTObject, createGETObject};
