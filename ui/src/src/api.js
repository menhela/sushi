const API_ENDPOINT = process.env.BACKEND_API_BASE;

export const getPrivateMessage = function(idToken) {
  return fetch(`${API_ENDPOINT}/private`, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: 'same-origin'
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  });
};

// TODO: Add authorization with API
export const allGuilts = function() {
  return fetch(`${API_ENDPOINT}/guilts`, { method: 'get' })
    .then(res => {
      if (res.ok) {
        return res.text();
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    })
    .then(res => {
      return JSON.parse(res);
    });
};

// TODO: Add authorization with API
export const createWarning = function(body) {
  return fetch(`${API_ENDPOINT}/warning`, { method: 'post', body: JSON.stringify(body) })
    .then(res => {
      if (res.ok) {
        return res.text();
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    })
    .then(res => {
      return JSON.parse(res);
    });
};

export const getWarning = function(hashId) {
  return fetch(`${API_ENDPOINT}/warning/` + hashId, { method: 'get' })
    .then(res => {
      if (res.ok) {
        return res.text();
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    })
    .then(res => {
      return JSON.parse(res);
    });
};

export const getPublicMessage = function() {
  return fetch(`${API_ENDPOINT}/public`);
};
